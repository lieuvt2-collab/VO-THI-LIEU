import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import mammoth from 'mammoth';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Configure express body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer in-memory storage for document uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Model to use
const MODEL_NAME = 'gemini-3.8-flash';

// Helper to sanitize Gemini JSON response
function cleanJsonResponse(raw: string): any {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
  }
  return JSON.parse(cleaned.trim());
}

// 1. API: Extract text/content from uploaded file (.docx, .pdf, .txt)
app.post('/api/extract-doc', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không tìm thấy file tải lên.' });
    }

    const { originalname, mimetype, buffer } = req.file;
    const ext = path.extname(originalname).toLowerCase();

    let extractedText = '';
    let isPdf = false;
    let base64Pdf = '';

    if (ext === '.docx' || mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (ext === '.txt' || ext === '.md' || mimetype === 'text/plain') {
      extractedText = buffer.toString('utf-8');
    } else if (ext === '.pdf' || mimetype === 'application/pdf') {
      isPdf = true;
      base64Pdf = buffer.toString('base64');
      // Also extract brief preview from Gemini if needed or return base64
      extractedText = `[Tài liệu PDF: ${originalname} (${(buffer.length / 1024).toFixed(1)} KB) - Đã sẵn sàng nạp trực tiếp vào Gemini AI]`;
    } else {
      return res.status(400).json({ error: 'Định dạng file không được hỗ trợ. Vui lòng tải file .docx, .pdf hoặc .txt' });
    }

    return res.json({
      fileName: originalname,
      fileSize: buffer.length,
      fileType: ext,
      extractedText,
      isPdf,
      pdfBase64: isPdf ? base64Pdf : undefined,
    });
  } catch (error: any) {
    console.error('Error extracting document:', error);
    return res.status(500).json({ error: 'Lỗi đọc file: ' + (error.message || 'Không thể xử lý file') });
  }
});

// 2. API: Generate full KHBD from parameters and source document
app.post('/api/generate-khbd', async (req, res) => {
  try {
    const {
      subject,
      grade,
      lessonTitle,
      durationPeriods = 2,
      bookSeries = 'Kết nối tri thức với cuộc sống',
      sourceText = '',
      pdfBase64,
      pedagogicalFocus = '',
      specialInstructions = '',
    } = req.body;

    if (!subject || !lessonTitle) {
      return res.status(400).json({ error: 'Vui lòng cung cấp Môn học và Tên bài học.' });
    }

    const systemPrompt = `Bạn là chuyên gia sư phạm cao cấp của Hệ thống Giáo dục FPT Schools (Việt Nam) và chuyên gia biên soạn Kế hoạch bài dạy (KHBD) chuẩn Công văn 5512/BGDĐT.
Nhiệm vụ của bạn là xây dựng một Kế hoạch bài dạy (KHBD) hoàn chỉnh, đẳng cấp, sư phạm hiện đại, mang đậm bản sắc giáo dục đổi mới sáng tạo và chuyển đổi số của FPT Schools.

QUY TẮC CỐT LÕI BẮT BUỘC:
1. NẾU CÓ TÀI LIỆU NGUỒN (File Word/PDF hoặc văn bản):
   - Tuyệt đối đọc kỹ và bám sát tài liệu nguồn.
   - KHÔNG tự ý thay đổi kiến thức chuẩn, KHÔNG bỏ sót các khái niệm, định nghĩa, nội dung hay số liệu có trong tài liệu.
   - Sắp xếp và phân bổ toàn bộ khối lượng kiến thức trong tài liệu vào đúng tiến trình dạy học ${durationPeriods} tiết.

2. CẤU TRÚC KHBD CHUẨN CÔNG VĂN 5512 & FPT SCHOOLS:
   - I. MỤC TIÊU:
     + 1. Kiến thức: Cụ thể các kiến thức, khái niệm trọng tâm HS phải nắm vững.
     + 2. Năng lực:
          * Năng lực chung: Tự chủ và tự học; Giao tiếp và hợp tác; Giải quyết vấn đề và sáng tạo (gắn chặt với hoạt động bài học).
          * Năng lực đặc thù môn học: Nêu rõ năng lực chuyên biệt của môn ${subject} (ví dụ GDCD/GDKTPL: điều chỉnh hành vi, tìm hiểu hoạt động KT-PL; Toán: tư duy và lập luận toán học, mô hình hóa; Ngữ văn: năng lực ngôn ngữ, văn học...).
     + 3. Phẩm chất: Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm (thể hiện qua thái độ, hành động cụ thể).
     + 4. Tích hợp: Tích hợp liên môn, kỹ năng sống, Chuyển đổi số / Công nghệ thông tin theo phong cách FPT Schools, định hướng nghề nghiệp.
   - II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU:
     + Giáo viên: Slide trình chiếu (PowerPoint/Canva), video clip tình huống, hệ thống phiếu học tập cụ thể, thiết bị thông minh phòng học FPT...
     + Học sinh: SGK ${bookSeries}, vở ghi, đồ dùng học tập, thiết bị số hỗ trợ tra cứu...
   - III. TIẾN TRÌNH DẠY HỌC:
     Gồm đủ 4 hoạt động bài dạy:
     A. Hoạt động 1: Mở đầu / Khởi động (Tạo tình huống có vấn đề hoặc trò chơi kết nối).
     B. Hoạt động 2: Hình thành kiến thức mới / Khám phá (chia thành các tiểu hoạt động tương ứng với nội dung kiến thức).
     C. Hoạt động 3: Luyện tập (Củng cố, giải bài tập, phân tích tình huống, trắc nghiệm).
     D. Hoạt động 4: Vận dụng (Gắn với đời sống thực tế, gia đình, nhà trường, dự án nhỏ).

3. ĐẶC BIỆT QUAN TRỌNG VỀ TỪNG HOẠT ĐỘNG:
   - Mỗi hoạt động PHẢI CÓ:
     a. Mục tiêu hoạt động.
     b. Nội dung hoạt động.
     c. DỰ KIẾN SẢN PHẨM HỌC TẬP CỤ THỂ: TUYỆT ĐỐI KHÔNG VIẾT CHUNG CHUNG kiểu "học sinh trả lời được câu hỏi", "học sinh hoàn thành phiếu". Phải viết rõ câu trả lời chi tiết, nội dung bảng so sánh, đáp án tình huống hoặc kết quả cụ thể mà học sinh tạo ra!
     d. Tổ chức thực hiện theo đúng 4 bước chuẩn 5512:
        * Bước 1: Chuyển giao nhiệm vụ
        * Bước 2: Thực hiện nhiệm vụ
        * Bước 3: Báo cáo, thảo luận
        * Bước 4: Kết luận, nhận định
   - TRONG TỪNG BƯỚC PHẢI TÁCH BẠCH RÕ RÀNG:
     + Hoạt động của giáo viên (GV giao gì, hướng dẫn ra sao, quan sát nhóm thế nào, chuẩn hóa kiến thức gì).
     + Hoạt động của học sinh (HS tiếp nhận ra sao, phân công nhóm thế nào, thảo luận, trình bày, tranh luận và ghi chép nội dung gì).

4. ĐỊNH DẠNG TRẢ VỀ:
   Trả về DUY NHẤT một JSON hợp lệ tuân thủ cấu trúc sau:
{
  "header": {
    "subject": "${subject}",
    "grade": ${Number(grade) || 10},
    "bookSeries": "${bookSeries}",
    "lessonTitle": "${lessonTitle}",
    "durationPeriods": ${Number(durationPeriods) || 2},
    "lessonNumber": "Bài học"
  },
  "schoolInfo": {
    "schoolName": "TRƯỜNG TH, THCS & THPT FPT",
    "department": "TỔ CHUYÊN MÔN",
    "teacherName": "Giáo viên FPT Schools",
    "schoolYear": "2025 - 2026",
    "date": "${new Date().toLocaleDateString('vi-VN')}"
  },
  "objectives": {
    "knowledge": ["string"],
    "generalCompetencies": {
      "selfReliance": ["string"],
      "communication": ["string"],
      "problemSolving": ["string"]
    },
    "specificCompetencies": ["string"],
    "qualities": {
      "patriotism": "string",
      "compassion": "string",
      "diligence": "string",
      "honesty": "string",
      "responsibility": "string"
    },
    "integration": ["string"]
  },
  "equipment": {
    "teacherEquipment": ["string"],
    "studentEquipment": ["string"]
  },
  "activities": [
    {
      "id": "act-1",
      "type": "warmup | discovery | practice | application",
      "title": "string",
      "durationMinutes": 10,
      "objective": "string",
      "content": "string",
      "product": "Sản phẩm cụ thể chi tiết, câu trả lời mẫu hoặc bảng biểu",
      "teachingMethod": "Tên phương pháp/kỹ thuật dạy học tích cực",
      "steps": [
        {
          "stepNumber": 1,
          "stepName": "Bước 1: Chuyển giao nhiệm vụ",
          "teacherActivity": "Chi tiết hoạt động của GV",
          "studentActivity": "Chi tiết hoạt động của HS"
        },
        {
          "stepNumber": 2,
          "stepName": "Bước 2: Thực hiện nhiệm vụ",
          "teacherActivity": "Chi tiết hoạt động của GV",
          "studentActivity": "Chi tiết hoạt động của HS"
        },
        {
          "stepNumber": 3,
          "stepName": "Bước 3: Báo cáo, thảo luận",
          "teacherActivity": "Chi tiết hoạt động của GV",
          "studentActivity": "Chi tiết hoạt động của HS"
        },
        {
          "stepNumber": 4,
          "stepName": "Bước 4: Kết luận, nhận định",
          "teacherActivity": "Chi tiết hoạt động của GV (chốt kiến thức)",
          "studentActivity": "Chi tiết hoạt động của HS (ghi bài)"
        }
      ]
    }
  ],
  "sourceDocSummary": "Tóm tắt ngắn gọn các kiến thức trọng tâm đã được đưa vào KHBD từ tài liệu"
}`;

    let userPrompt = `Hãy soạn Kế hoạch bài dạy hoàn chỉnh theo đúng chuẩn yêu cầu:
- Môn học: ${subject}
- Khối lớp: ${grade}
- Tên bài dạy: ${lessonTitle}
- Số tiết dạy: ${durationPeriods} tiết
- Bộ sách giáo khoa: ${bookSeries}
${pedagogicalFocus ? `- Định hướng phương pháp mong muốn: ${pedagogicalFocus}` : ''}
${specialInstructions ? `- Yêu cầu bổ sung của giáo viên: ${specialInstructions}` : ''}
`;

    const contents: any[] = [];

    // Multimodal input if PDF uploaded
    if (pdfBase64) {
      contents.push({
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64,
        },
      });
      userPrompt += `\n[TÀI LIỆU NGUỒN PDF ĐÃ ĐÍNH KÈM Ở TRÊN]: Hãy đọc kỹ toàn bộ văn bản trong tài liệu PDF này để làm căn cứ chính xác biên soạn KHBD.`;
    } else if (sourceText && sourceText.trim().length > 0) {
      userPrompt += `\n\n--- NỘI DUNG TÀI LIỆU NGUỒN CUNG CẤP (BẮT BUỘC BÁM SÁT) ---\n${sourceText}\n--- HẾT TÀI LIỆU NGUỒN ---`;
    }

    contents.push({ text: userPrompt });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsedJson = cleanJsonResponse(response.text || '{}');
    // Assign unique IDs if missing
    parsedJson.id = `khbd-${Date.now()}`;
    if (parsedJson.header) {
      parsedJson.header.id = parsedJson.id;
      parsedJson.header.createdAt = new Date().toISOString();
      parsedJson.header.updatedAt = new Date().toISOString();
    }
    if (Array.isArray(parsedJson.activities)) {
      parsedJson.activities.forEach((act: any, idx: number) => {
        if (!act.id) act.id = `act-${idx + 1}-${Date.now()}`;
      });
    }

    return res.json({ success: true, lessonPlan: parsedJson });
  } catch (error: any) {
    console.error('Error generating KHBD:', error);
    return res.status(500).json({ error: 'Lỗi khi AI soạn KHBD: ' + (error.message || 'Không thể tạo giáo án') });
  }
});

// 3. API: AI Specialized Actions (Rewrite Activity, Expand, Logic Audit, Auto-Fix)
app.post('/api/ai-action', async (req, res) => {
  try {
    const { actionType, payload } = req.body;

    if (!actionType) {
      return res.status(400).json({ error: 'Thiếu actionType.' });
    }

    if (actionType === 'audit') {
      // Logic & Circular 5512 compliance audit
      const { lessonPlan } = payload;
      const prompt = `Bạn là Chuyên gia Kiểm định Chất lượng Sư phạm của FPT Schools. Hãy thẩm định Kế hoạch bài dạy (KHBD) sau theo Công văn 5512/BGDĐT.

Đánh giá các tiêu chí:
1. Tính tương thích giữa Mục tiêu (I) và Tiến trình dạy học (III): Mọi mục tiêu kiến thức, năng lực, phẩm chất có được hiện thực hóa qua các hoạt động không?
2. Sự phân định rõ ràng giữa Hoạt động của GV và HS trong 4 bước: GV có bị nói quá nhiều hoặc HS bị thụ động không?
3. Tính cụ thể của Dự kiến sản phẩm học tập: Có đáp án chi tiết, bảng biểu, sản phẩm thật không hay chỉ viết chung chung?
4. Đổi mới phương pháp và ứng dụng công nghệ giáo dục chuẩn FPT Schools.

Dữ liệu KHBD cần thẩm định:
${JSON.stringify(lessonPlan, null, 2)}

Hãy trả về DUY NHẤT một JSON hợp lệ theo cấu trúc sau:
{
  "overallScore": number (từ 0 đến 100),
  "verdict": "XuatSac" | "DatChuan" | "CanDieuChinh",
  "summary": "Tóm tắt đánh giá chung trong 2-3 câu ngắn gọn",
  "items": [
    {
      "id": "item-1",
      "title": "Tên tiêu chí thẩm định",
      "criterion": "Mô tả tiêu chí theo 5512",
      "passed": boolean,
      "score": number (trên 100),
      "comment": "Nhận xét chi tiết",
      "suggestedFix": "Gợi ý điều chỉnh cụ thể"
    }
  ],
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "improvements": ["Điểm cần khắc phục 1", "Điểm cần khắc phục 2"],
  "canAutoFix": true
}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const auditData = cleanJsonResponse(response.text || '{}');
      return res.json({ success: true, audit: auditData });
    }

    if (actionType === 'rewrite-activity') {
      // Rewrite a specific activity with an active teaching method
      const { activity, method, subject, grade, lessonTitle } = payload;
      const prompt = `Bạn là Chuyên gia Phương pháp Dạy học Tích cực FPT Schools.
Hãy viết lại hoạt động dạy học sau theo phương pháp / kỹ thuật: "${method}".

Thông tin bài học:
- Môn: ${subject}, Khối: ${grade}, Bài: ${lessonTitle}
- Hoạt động gốc:
${JSON.stringify(activity, null, 2)}

YÊU CẦU:
1. Áp dụng chuẩn kỹ thuật "${method}" (ví dụ: Khăn trải bàn, Mảnh ghép, Trạm, Đóng vai, Think-Pair-Share, hoặc Ứng dụng công nghệ số).
2. Giữ nguyên mục tiêu cốt lõi, nhưng làm cho tiến trình hấp dẫn, học sinh chủ động tối đa.
3. Dự kiến sản phẩm học tập PHẢI CỤ THỂ, rõ ràng, chi tiết câu trả lời / phiếu học tập.
4. Giữ đúng 4 bước chuẩn 5512, tách biệt rành mạch Hoạt động của GV và Hoạt động của HS.

Trả về DUY NHẤT một JSON hợp lệ chứa hoạt động đã viết lại:
{
  "id": "${activity.id || 'act-rewritten'}",
  "type": "${activity.type || 'discovery'}",
  "title": "Tiêu đề mới sinh động gắn với phương pháp ${method}",
  "durationMinutes": ${activity.durationMinutes || 15},
  "objective": "Mục tiêu cụ thể",
  "content": "Nội dung hoạt động chi tiết",
  "product": "Sản phẩm học tập chi tiết cụ thể",
  "teachingMethod": "${method}",
  "steps": [
    {
      "stepNumber": 1,
      "stepName": "Bước 1: Chuyển giao nhiệm vụ",
      "teacherActivity": "GV...",
      "studentActivity": "HS..."
    },
    {
      "stepNumber": 2,
      "stepName": "Bước 2: Thực hiện nhiệm vụ",
      "teacherActivity": "GV...",
      "studentActivity": "HS..."
    },
    {
      "stepNumber": 3,
      "stepName": "Bước 3: Báo cáo, thảo luận",
      "teacherActivity": "GV...",
      "studentActivity": "HS..."
    },
    {
      "stepNumber": 4,
      "stepName": "Bước 4: Kết luận, nhận định",
      "teacherActivity": "GV...",
      "studentActivity": "HS..."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const updatedActivity = cleanJsonResponse(response.text || '{}');
      return res.json({ success: true, activity: updatedActivity });
    }

    if (actionType === 'auto-fix-audit') {
      // Auto-fix the lesson plan based on the audit recommendations
      const { lessonPlan, audit } = payload;
      const prompt = `Bạn là Chuyên gia Sư phạm FPT Schools. Hãy hoàn thiện và nâng cấp toàn bộ Kế hoạch bài dạy này để đạt chuẩn Xuất sắc theo kết quả kiểm định sau:

Kết quả kiểm định cần sửa chữa:
- Điểm cần khắc phục: ${JSON.stringify(audit.improvements || [])}
- Gợi ý điều chỉnh: ${JSON.stringify((audit.items || []).map((i: any) => i.suggestedFix).filter(Boolean))}

Dữ liệu KHBD hiện tại:
${JSON.stringify(lessonPlan, null, 2)}

YÊU CẦU:
- Làm cho mọi sản phẩm học tập cụ thể, chi tiết, không còn bất kỳ câu nào chung chung.
- Tách bạch rõ ràng, làm sâu sắc hoạt động của GV và hoạt động của HS trong cả 4 bước của tất cả hoạt động.
- Đảm bảo tính logic tuyệt đối giữa Mục tiêu và Tiến trình dạy học.
- Giữ nguyên cấu trúc JSON của KHBD.

Trả về DUY NHẤT một JSON hợp lệ chứa KHBD đã được nâng cấp hoàn chỉnh.`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const fixedPlan = cleanJsonResponse(response.text || '{}');
      return res.json({ success: true, lessonPlan: fixedPlan });
    }

    if (actionType === 'add-rubric') {
      // Add a detailed assessment rubric to the lesson plan
      const { lessonPlan } = payload;
      const prompt = `Dựa trên KHBD sau của môn ${lessonPlan?.header?.subject} bài "${lessonPlan?.header?.lessonTitle}", hãy tạo một Bảng tiêu chí đánh giá sản phẩm học tập (Rubric) chi tiết theo 4 mức độ: Mức 1 (Chưa đạt), Mức 2 (Đạt), Mức 3 (Khá), Mức 4 (Tốt/Xuất sắc) để giáo viên FPT Schools in ra đánh giá học sinh.

KHBD:
${JSON.stringify(lessonPlan, null, 2)}

Trả về DUY NHẤT JSON hợp lệ:
{
  "rubricTitle": "Bảng tiêu chí đánh giá (Rubric) bài học",
  "criteria": [
    {
      "name": "Tiêu chí",
      "weight": "Trọng số %",
      "level1": "Mô tả mức 1",
      "level2": "Mô tả mức 2",
      "level3": "Mô tả mức 3",
      "level4": "Mô tả mức 4"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const rubricData = cleanJsonResponse(response.text || '{}');
      return res.json({ success: true, rubric: rubricData });
    }

    return res.status(400).json({ error: 'Action type không được hỗ trợ.' });
  } catch (error: any) {
    console.error('Error in AI action:', error);
    return res.status(500).json({ error: 'Lỗi thực hiện tác vụ AI: ' + (error.message || 'Thất bại') });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[KHBD Studio - FPT Schools] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
