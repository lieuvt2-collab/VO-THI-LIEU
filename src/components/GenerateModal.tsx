import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Upload,
  FileText,
  FileCheck,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Clock,
  Layers,
  ChevronDown,
  Loader2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GenerateKHBDRequest, LessonPlan } from '../types/khbd';
import { extractDocumentFile, generateKHBDFromAI } from '../services/api';

interface GenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (newPlan: LessonPlan) => void;
}

const COMMON_SUBJECTS = [
  'Giáo dục kinh tế và pháp luật',
  'Giáo dục công dân',
  'Toán học',
  'Ngữ văn',
  'Lịch sử',
  'Địa lí',
  'Khoa học tự nhiên',
  'Tin học',
  'Tiếng Anh',
  'Vật lí',
  'Hóa học',
  'Sinh học',
  'Công nghệ',
  'Hoạt động trải nghiệm, hướng nghiệp',
];

const BOOK_SERIES = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
  'Chương trình nhà trường FPT Schools',
];

const PEDAGOGICAL_METHODS = [
  'Kỹ thuật Khăn trải bàn kết hợp Sơ đồ tư duy',
  'Kỹ thuật Mảnh ghép (Jigsaw) phát huy tính tự chủ',
  'Dạy học theo trạm (Station Learning) tích cực',
  'Dạy học dựa trên giải quyết vấn đề (PBL) & Tình huống thực tế',
  'Đóng vai (Role-playing) & Tranh biện học đường',
  'Ứng dụng Trò chơi tương tác (Kahoot/Quizizz) & Chuyển đổi số FPT',
  'Dạy học dự án nhỏ (Mini-Project) gắn với thực tiễn',
];

export const GenerateModal: React.FC<GenerateModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
}) => {
  const [subject, setSubject] = useState('Giáo dục kinh tế và pháp luật');
  const [customSubject, setCustomSubject] = useState('');
  const [grade, setGrade] = useState(11);
  const [bookSeries, setBookSeries] = useState('Kết nối tri thức với cuộc sống');
  const [lessonTitle, setLessonTitle] = useState('');
  const [durationPeriods, setDurationPeriods] = useState(2);
  const [pedagogicalFocus, setPedagogicalFocus] = useState(PEDAGOGICAL_METHODS[0]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Source document state
  const [activeSourceTab, setActiveSourceTab] = useState<'upload' | 'paste'>('upload');
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string;
    fileSize: number;
    fileType: string;
    extractedText: string;
    isPdf: boolean;
    pdfBase64?: string;
  } | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      const res = await extractDocumentFile(file);
      setUploadedFile(res);
      // Auto-suggest lesson title from file name if blank
      if (!lessonTitle) {
        const cleanName = file.name
          .replace(/\.(docx|pdf|txt)$/i, '')
          .replace(/[-_]/g, ' ');
        setLessonTitle(cleanName);
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Lỗi khi đọc file tài liệu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartGenerate = async () => {
    const finalSubject = subject === 'Khác' ? customSubject.trim() : subject;
    if (!finalSubject) {
      setError('Vui lòng chọn hoặc nhập tên Môn học.');
      return;
    }
    if (!lessonTitle.trim()) {
      setError('Vui lòng nhập Tên bài học (ví dụ: Bài 3: Lạm phát).');
      return;
    }

    try {
      setError(null);
      setIsGenerating(true);
      setGenerationStep('Đang phân tích tài liệu nguồn và trích xuất cấu trúc kiến thức cốt lõi...');

      setTimeout(() => {
        setGenerationStep('Đang xác lập Mục tiêu (Kiến thức, Năng lực chung & đặc thù, Phẩm chất, Tích hợp)...');
      }, 3500);

      setTimeout(() => {
        setGenerationStep('Đang thiết kế 4 Hoạt động chuẩn 5512: Phân vai rõ ràng Giáo viên & Học sinh...');
      }, 7500);

      setTimeout(() => {
        setGenerationStep('Đang chi tiết hóa Dự kiến sản phẩm học tập cụ thể, không chung chung...');
      }, 12000);

      const requestPayload: GenerateKHBDRequest = {
        subject: finalSubject,
        grade: Number(grade),
        bookSeries,
        lessonTitle: lessonTitle.trim(),
        durationPeriods: Number(durationPeriods),
        pedagogicalFocus,
        specialInstructions,
        sourceText: activeSourceTab === 'paste' ? pastedText : uploadedFile?.extractedText,
        pdfBase64: activeSourceTab === 'upload' && uploadedFile?.isPdf ? uploadedFile.pdfBase64 : undefined,
      };

      const newPlan = await generateKHBDFromAI(requestPayload);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onGenerated(newPlan);
      onClose();
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Lỗi trong quá trình AI tạo Kế hoạch bài dạy.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#002D72] via-[#003B95] to-[#002D72] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F27024] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Soạn Kế Hoạch Bài Dạy Mới Bằng Gemini AI</h2>
              <p className="text-xs text-blue-200">
                Chuẩn Công văn 5512/BGDĐT & Bản sắc Giáo dục Đổi mới FPT Schools
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Đã xảy ra lỗi:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Môn học <span className="text-red-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              >
                {COMMON_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                <option value="Khác">Môn học khác (nhập tùy chỉnh)...</option>
              </select>
              {subject === 'Khác' && (
                <input
                  type="text"
                  placeholder="Nhập tên môn học..."
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
                />
              )}
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Khối lớp <span className="text-red-500">*</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    Khối Lớp {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Lesson Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tên bài học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Bài 3: Lạm phát (hoặc Bài 1: Tự hào truyền thống gia đình...)"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            {/* Book Series */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bộ sách giáo khoa
              </label>
              <select
                value={bookSeries}
                onChange={(e) => setBookSeries(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              >
                {BOOK_SERIES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration (Periods) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Thời lượng (Số tiết)
              </label>
              <select
                value={durationPeriods}
                onChange={(e) => setDurationPeriods(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              >
                {[1, 2, 3, 4, 5].map((p) => (
                  <option key={p} value={p}>
                    {p} tiết ({p * 45} phút)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SOURCE DOCUMENT SECTION */}
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#002D72] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#F27024]" />
                  Tài liệu nguồn tham khảo (Word hoặc PDF)
                </h4>
                <p className="text-xs text-slate-500">
                  AI sẽ đọc nội dung tài liệu và soạn KHBD bám sát 100%, không bịa đặt, không bỏ sót kiến thức.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveSourceTab('upload')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeSourceTab === 'upload' ? 'bg-white text-[#002D72] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tải file (.docx, .pdf)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSourceTab('paste')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeSourceTab === 'paste' ? 'bg-white text-[#002D72] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Dán nội dung
                </button>
              </div>
            </div>

            {activeSourceTab === 'upload' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".docx,.pdf,.txt,.md"
                  className="hidden"
                />

                {!uploadedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#F27024] rounded-xl p-6 text-center cursor-pointer transition-colors bg-white group"
                  >
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#F27024] mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-slate-700">
                      {isUploading ? 'Đang trích xuất nội dung tài liệu...' : 'Nhấn để tải lên file Word (.docx) hoặc PDF (.pdf)'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Hỗ trợ giáo trình, SGK điện tử, đề cương, bài giảng của giáo viên
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-3.5 border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {uploadedFile.fileName}
                        </p>
                        <p className="text-xs text-emerald-600 font-medium">
                          Đã trích xuất thành công ({(uploadedFile.fileSize / 1024).toFixed(1)} KB)
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="text-xs text-slate-400 hover:text-red-500 font-medium shrink-0 px-2 py-1 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Đổi file khác
                    </button>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <textarea
                  rows={4}
                  placeholder="Dán các đoạn kiến thức trọng tâm từ SGK, tài liệu tham khảo hoặc ghi chú của Thầy/Cô vào đây..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] bg-white resize-y"
                />
              </div>
            )}
          </div>

          {/* Pedagogical Focus & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phương pháp / Kỹ thuật dạy học chủ đạo
              </label>
              <select
                value={pedagogicalFocus}
                onChange={(e) => setPedagogicalFocus(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              >
                {PEDAGOGICAL_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Yêu cầu bổ sung của giáo viên
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Tăng cường hoạt động tranh biện, tích hợp chuyển đổi số..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {isGenerating ? (
            <div className="flex items-center gap-3 text-xs text-[#002D72] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-[#F27024]" />
              <span>{generationStep || 'Gemini AI đang soạn kế hoạch bài dạy...'}</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              ⚡ Sử dụng mô hình <strong className="text-slate-700">Gemini 3.8 Flash</strong> bám sát Công văn 5512
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleStartGenerate}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#F27024] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Bắt đầu AI Soạn KHBD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
