import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { LessonPlan } from '../types/khbd';
import { exportLessonPlanToDocx } from '../services/docxExport';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonPlan: LessonPlan;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  lessonPlan,
}) => {
  if (!isOpen) return null;

  const { header, schoolInfo, objectives, equipment, activities } = lessonPlan;

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = async () => {
    await exportLessonPlanToDocx(lessonPlan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl my-4 flex flex-col max-h-[95vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Modal Top Bar - Hidden when printing */}
        <div className="px-6 py-4 bg-slate-800 text-white flex items-center justify-between print:hidden rounded-t-2xl">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">Xem Trước Định Dạng Trang In Chuẩn 5512</h2>
            <span className="text-xs text-slate-400">• Font Times New Roman</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportWord}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F27024] hover:bg-[#ea580c] text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.docx)</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#002D72] hover:bg-[#00245a] text-white flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In trang / Lưu PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview (Standard Vietnamese KHBD layout) */}
        <div className="p-8 sm:p-12 overflow-y-auto flex-1 font-['Times_New_Roman',serif] text-slate-900 leading-relaxed text-[15px] space-y-6 bg-white select-text">
          {/* Header 2 columns */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-bold text-sm tracking-wide text-[#002D72]">
                {schoolInfo?.schoolName || 'TRƯỜNG TH, THCS & THPT FPT'}
              </p>
              <p className="font-bold text-xs uppercase">
                {schoolInfo?.department || 'TỔ CHUYÊN MÔN'}
              </p>
              <p className="italic text-xs mt-1">
                Giáo viên: {schoolInfo?.teacherName || 'Tổ bộ môn'}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </p>
              <p className="font-bold text-xs underline">
                Độc lập - Tự do - Hạnh phúc
              </p>
              <p className="italic text-xs mt-1">
                Năm học: {schoolInfo?.schoolYear || '2025 - 2026'}
              </p>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center pt-2">
            <h1 className="text-xl font-bold uppercase tracking-wide text-[#002D72]">
              KẾ HOẠCH BÀI DẠY
            </h1>
            <p className="font-bold text-base text-[#F27024] mt-1">
              MÔN: {header.subject.toUpperCase()} - KHỐI LỚP: {header.grade}
            </p>
            <p className="font-bold text-lg uppercase mt-0.5">
              {header.lessonTitle}
            </p>
            <p className="italic text-xs text-slate-600 mt-1">
              Bộ sách: {header.bookSeries} | Thời lượng: {header.durationPeriods} tiết | Ngày soạn: {schoolInfo?.date || new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>

          {/* I. MỤC TIÊU */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-base uppercase text-[#002D72]">
              I. MỤC TIÊU
            </h2>

            <div>
              <p className="font-bold">1. Về kiến thức:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                {objectives?.knowledge?.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold">2. Về năng lực:</p>
              <div className="pl-4 space-y-2 mt-1">
                <p className="italic font-bold">a) Năng lực chung:</p>
                <p className="pl-4">
                  - <strong>Tự chủ và tự học:</strong> {objectives?.generalCompetencies?.selfReliance?.join('; ')}
                </p>
                <p className="pl-4">
                  - <strong>Giao tiếp và hợp tác:</strong> {objectives?.generalCompetencies?.communication?.join('; ')}
                </p>
                <p className="pl-4">
                  - <strong>Giải quyết vấn đề và sáng tạo:</strong> {objectives?.generalCompetencies?.problemSolving?.join('; ')}
                </p>

                <p className="italic font-bold pt-1">b) Năng lực đặc thù môn học:</p>
                <ul className="list-disc pl-8 space-y-1">
                  {objectives?.specificCompetencies?.map((sc, i) => (
                    <li key={i}>{sc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="font-bold">3. Về phẩm chất:</p>
              <div className="pl-4 space-y-1 mt-1">
                <p>- <strong>Yêu nước:</strong> {objectives?.qualities?.patriotism}</p>
                <p>- <strong>Nhân ái:</strong> {objectives?.qualities?.compassion}</p>
                <p>- <strong>Chăm chỉ:</strong> {objectives?.qualities?.diligence}</p>
                <p>- <strong>Trung thực:</strong> {objectives?.qualities?.honesty}</p>
                <p>- <strong>Trách nhiệm:</strong> {objectives?.qualities?.responsibility}</p>
              </div>
            </div>

            <div>
              <p className="font-bold">4. Tích hợp giáo dục & Chuyển đổi số FPT:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                {objectives?.integration?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU */}
          <div className="space-y-3 pt-2">
            <h2 className="font-bold text-base uppercase text-[#002D72]">
              II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
            </h2>
            <div>
              <p className="font-bold">1. Đối với giáo viên:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                {equipment?.teacherEquipment?.map((te, i) => (
                  <li key={i}>{te}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold">2. Đối với học sinh:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                {equipment?.studentEquipment?.map((se, i) => (
                  <li key={i}>{se}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* III. TIẾN TRÌNH DẠY HỌC */}
          <div className="space-y-6 pt-2">
            <h2 className="font-bold text-base uppercase text-[#002D72]">
              III. TIẾN TRÌNH DẠY HỌC
            </h2>

            {activities.map((act, index) => {
              const letter = ['A', 'B', 'C', 'D'][index % 4] || `${index + 1}`;
              return (
                <div key={act.id} className="space-y-3 border-t border-slate-300 pt-4">
                  <h3 className="font-bold text-base text-[#002D72]">
                    {letter}. {act.title.toUpperCase()} ({act.durationMinutes} phút)
                  </h3>

                  <p><strong>a) Mục tiêu:</strong> {act.objective}</p>
                  <p><strong>b) Nội dung:</strong> {act.content}</p>
                  <p className="text-amber-900 bg-amber-50/70 p-2 rounded border border-amber-200">
                    <strong className="text-amber-800">c) Dự kiến sản phẩm học tập cụ thể:</strong> {act.product}
                  </p>

                  <div>
                    <p className="font-bold mb-2">
                      d) Tổ chức thực hiện: {act.teachingMethod && <em>[Phương pháp: {act.teachingMethod}]</em>}
                    </p>

                    {/* Table 2 columns for GV & HS */}
                    <table className="w-full border-collapse border border-slate-400 text-xs text-left">
                      <thead>
                        <tr className="bg-slate-100 font-bold text-center">
                          <th className="border border-slate-400 p-2.5 w-1/2 text-[#002D72]">
                            HOẠT ĐỘNG CỦA GIÁO VIÊN
                          </th>
                          <th className="border border-slate-400 p-2.5 w-1/2 text-[#ea580c]">
                            HOẠT ĐỘNG CỦA HỌC SINH
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {act.steps.map((step) => (
                          <tr key={step.stepNumber} className="align-top">
                            <td className="border border-slate-400 p-2.5">
                              <p className="font-bold text-[#002D72] mb-1">{step.stepName}:</p>
                              <p className="whitespace-pre-line leading-relaxed">{step.teacherActivity}</p>
                            </td>
                            <td className="border border-slate-400 p-2.5">
                              <p className="font-bold text-[#ea580c] mb-1">{step.stepName}:</p>
                              <p className="whitespace-pre-line leading-relaxed">{step.studentActivity}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="font-bold uppercase">DUYỆT CỦA TỔ TRƯỞNG CHUYÊN MÔN</p>
              <p className="italic text-slate-500">(Ký và ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="italic text-slate-600 mb-1">
                FPT Schools, ngày {schoolInfo?.date || new Date().toLocaleDateString('vi-VN')}
              </p>
              <p className="font-bold uppercase">GIÁO VIÊN SOẠN BÀI</p>
              <p className="italic text-slate-500 mb-12">(Ký và ghi rõ họ tên)</p>
              <p className="font-bold">{schoolInfo?.teacherName || 'Giáo viên bộ môn'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
