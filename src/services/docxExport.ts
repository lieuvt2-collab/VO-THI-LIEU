import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
} from 'docx';
import { LessonPlan } from '../types/khbd';

export async function exportLessonPlanToDocx(lesson: LessonPlan): Promise<void> {
  const { header, schoolInfo, objectives, equipment, activities } = lesson;

  const doc = new Document({
    creator: 'KHBD Studio - FPT Schools',
    title: `KHBD_${header.subject}_Lop${header.grade}_${header.lessonTitle}`,
    description: 'Kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT - FPT Schools',
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 26, // 13pt
            color: '1E293B',
          },
          paragraph: {
            spacing: {
              line: 280, // 1.2 line spacing
              after: 120,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2 cm
              bottom: 1134, // 2 cm
              left: 1701, // 3 cm
              right: 1134, // 2 cm
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'HỆ THỐNG GIÁO DỤC FPT SCHOOLS | KẾ HOẠCH BÀI DẠY CHUẨN 5512',
                    size: 18,
                    color: 'F27024',
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ' }),
                  new TextRun({ children: [PageNumber.CURRENT] }),
                  new TextRun({ text: ' / ' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Header Table (School & Nation)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: schoolInfo?.schoolName || 'TRƯỜNG TH, THCS & THPT FPT',
                            bold: true,
                            size: 22,
                            color: '002D72',
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: schoolInfo?.department || 'TỔ BỘ MÔN CHUYÊN MÔN',
                            bold: true,
                            size: 22,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `GV: ${schoolInfo?.teacherName || 'Giáo viên FPT'}`,
                            size: 20,
                            italics: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                            bold: true,
                            size: 22,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Độc lập - Tự do - Hạnh phúc',
                            bold: true,
                            size: 22,
                            underline: {},
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `Năm học: ${schoolInfo?.schoolYear || '2025 - 2026'}`,
                            size: 20,
                            italics: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Space
          new Paragraph({ text: '' }),

          // Main Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'KẾ HOẠCH BÀI DẠY',
                bold: true,
                size: 32, // 16pt
                color: '002D72',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `MÔN HỌC: ${header.subject.toUpperCase()} - KHỐI LỚP: ${header.grade}`,
                bold: true,
                size: 26,
                color: 'F27024',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${header.lessonTitle.toUpperCase()}`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Bộ sách: ${header.bookSeries} | Thời lượng: ${header.durationPeriods} tiết | Ngày soạn: ${schoolInfo?.date || new Date().toLocaleDateString('vi-VN')}`,
                italics: true,
                size: 22,
              }),
            ],
          }),

          new Paragraph({ text: '' }),

          // SECTION I
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: 'I. MỤC TIÊU',
                bold: true,
                size: 28,
                color: '002D72',
              }),
            ],
          }),

          // 1. Knowledge
          new Paragraph({
            children: [
              new TextRun({
                text: '1. Về kiến thức:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          ...(objectives?.knowledge || []).map(
            (k) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: k })],
              })
          ),

          // 2. Competencies
          new Paragraph({
            children: [
              new TextRun({
                text: '2. Về năng lực:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'a) Năng lực chung:',
                bold: true,
                italics: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Tự chủ và tự học: ', bold: true }),
              new TextRun({ text: objectives?.generalCompetencies?.selfReliance?.join('; ') || 'Chủ động nghiên cứu tài liệu.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Giao tiếp và hợp tác: ', bold: true }),
              new TextRun({ text: objectives?.generalCompetencies?.communication?.join('; ') || 'Biết lắng nghe, thảo luận nhóm.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Giải quyết vấn đề và sáng tạo: ', bold: true }),
              new TextRun({ text: objectives?.generalCompetencies?.problemSolving?.join('; ') || 'Đề xuất giải pháp thực tiễn.' }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'b) Năng lực đặc thù môn học:',
                bold: true,
                italics: true,
                size: 24,
              }),
            ],
          }),
          ...(objectives?.specificCompetencies || []).map(
            (sc) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: sc })],
              })
          ),

          // 3. Qualities
          new Paragraph({
            children: [
              new TextRun({
                text: '3. Về phẩm chất:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Yêu nước: ', bold: true }),
              new TextRun({ text: objectives?.qualities?.patriotism || 'Ý thức xây dựng quê hương, đất nước.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Nhân ái: ', bold: true }),
              new TextRun({ text: objectives?.qualities?.compassion || 'Biết tôn trọng, đồng cảm, chia sẻ.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Chăm chỉ: ', bold: true }),
              new TextRun({ text: objectives?.qualities?.diligence || 'Tích cực tìm tòi kiến thức, hoàn thành nhiệm vụ.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Trung thực: ', bold: true }),
              new TextRun({ text: objectives?.qualities?.honesty || 'Thật thà trong học tập và đánh giá.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '- Trách nhiệm: ', bold: true }),
              new TextRun({ text: objectives?.qualities?.responsibility || 'Có trách nhiệm với bản thân, gia đình và nhà trường.' }),
            ],
          }),

          // 4. Integration
          new Paragraph({
            children: [
              new TextRun({
                text: '4. Tích hợp giáo dục & Chuyển đổi số FPT:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          ...(objectives?.integration || []).map(
            (integ) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: integ })],
              })
          ),

          new Paragraph({ text: '' }),

          // SECTION II
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: 'II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU',
                bold: true,
                size: 28,
                color: '002D72',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '1. Đối với giáo viên:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          ...(equipment?.teacherEquipment || []).map(
            (te) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: te })],
              })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: '2. Đối với học sinh:',
                bold: true,
                size: 26,
              }),
            ],
          }),
          ...(equipment?.studentEquipment || []).map(
            (se) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: se })],
              })
          ),

          new Paragraph({ text: '' }),

          // SECTION III
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: 'III. TIẾN TRÌNH DẠY HỌC',
                bold: true,
                size: 28,
                color: '002D72',
              }),
            ],
          }),

          // Loop each activity
          ...activities.flatMap((act, actIndex) => {
            const letter = ['A', 'B', 'C', 'D'][actIndex % 4] || `${actIndex + 1}`;
            return [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${letter}. ${act.title.toUpperCase()} (${act.durationMinutes} phút)`,
                    bold: true,
                    size: 26,
                    color: '002D72',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'a) Mục tiêu: ', bold: true }),
                  new TextRun({ text: act.objective }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'b) Nội dung: ', bold: true }),
                  new TextRun({ text: act.content }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'c) Sản phẩm học tập dự kiến (cụ thể): ', bold: true, color: 'EA580C' }),
                  new TextRun({ text: act.product }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'd) Tổ chức thực hiện: ', bold: true }),
                  ...(act.teachingMethod ? [new TextRun({ text: `[Phương pháp: ${act.teachingMethod}]`, italics: true })] : []),
                ],
              }),

              // Table for 4 steps separating GV and HS activities
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  // Table Header
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        shading: { fill: '002D72' },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: 'HOẠT ĐỘNG CỦA GIÁO VIÊN',
                                bold: true,
                                size: 22,
                                color: 'FFFFFF',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        shading: { fill: 'F27024' },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: 'HOẠT ĐỘNG CỦA HỌC SINH',
                                bold: true,
                                size: 22,
                                color: 'FFFFFF',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),

                  // Table Rows for each step
                  ...act.steps.map(
                    (step) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${step.stepName}:`,
                                    bold: true,
                                    color: '002D72',
                                    size: 22,
                                  }),
                                ],
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: step.teacherActivity,
                                    size: 22,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${step.stepName}:`,
                                    bold: true,
                                    color: 'EA580C',
                                    size: 22,
                                  }),
                                ],
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: step.studentActivity,
                                    size: 22,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      })
                  ),
                ],
              }),

              new Paragraph({ text: '' }),
            ];
          }),

          // Signatures Footer Table
          new Paragraph({ text: '' }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'DUYỆT CỦA TỔ TRƯỞNG CHUYÊN MÔN',
                            bold: true,
                            size: 22,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: '(Ký và ghi rõ họ tên)',
                            italics: true,
                            size: 20,
                          }),
                        ],
                      }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `FPT Schools, ngày ${schoolInfo?.date || new Date().toLocaleDateString('vi-VN')}`,
                            italics: true,
                            size: 20,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'GIÁO VIÊN SOẠN BÀI',
                            bold: true,
                            size: 22,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: '(Ký và ghi rõ họ tên)',
                            italics: true,
                            size: 20,
                          }),
                        ],
                      }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: schoolInfo?.teacherName || 'Giáo viên bộ môn',
                            bold: true,
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const sanitizedTitle = header.lessonTitle
    .replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_')
    .slice(0, 40);
  const fileName = `KHBD_${header.subject.replace(/\s+/g, '_')}_Lop${header.grade}_${sanitizedTitle}_FPT_Schools.docx`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
