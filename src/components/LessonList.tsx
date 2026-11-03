import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Sparkles,
  FileText,
  Copy,
  Trash2,
  Download,
  Edit3,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Layers,
  CheckCircle2,
  Upload,
  Filter,
} from 'lucide-react';
import { LessonPlan } from '../types/khbd';
import { exportLessonPlanToDocx } from '../services/docxExport';

interface LessonListProps {
  plans: LessonPlan[];
  onSelectPlan: (plan: LessonPlan) => void;
  onOpenNewModal: () => void;
  onDuplicatePlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
}

const SUBJECT_CATEGORIES = [
  'Tất cả',
  'Giáo dục kinh tế và pháp luật',
  'Giáo dục công dân',
  'Toán học',
  'Ngữ văn',
  'Lịch sử',
  'Địa lí',
  'Khoa học tự nhiên',
  'Tin học',
  'Tiếng Anh',
];

const GRADES = ['Tất cả', 6, 7, 8, 9, 10, 11, 12];

export const LessonList: React.FC<LessonListProps> = ({
  plans,
  onSelectPlan,
  onOpenNewModal,
  onDuplicatePlan,
  onDeletePlan,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Tất cả');
  const [selectedGrade, setSelectedGrade] = useState<string | number>('Tất cả');
  const [exportingId, setExportingId] = useState<string | null>(null);

  // Filtered plans
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchSearch =
        plan.header.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.header.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plan.header.bookSeries && plan.header.bookSeries.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchSubject =
        selectedSubject === 'Tất cả' ||
        plan.header.subject.toLowerCase() === selectedSubject.toLowerCase();

      const matchGrade =
        selectedGrade === 'Tất cả' || Number(plan.header.grade) === Number(selectedGrade);

      return matchSearch && matchSubject && matchGrade;
    });
  }, [plans, searchTerm, selectedSubject, selectedGrade]);

  const handleExportDocx = async (e: React.MouseEvent, plan: LessonPlan) => {
    e.stopPropagation();
    try {
      setExportingId(plan.id);
      await exportLessonPlanToDocx(plan);
    } catch (err) {
      console.error('Export error:', err);
      alert('Không thể xuất file Word. Vui lòng thử lại.');
    } finally {
      setExportingId(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa Kế hoạch bài dạy "${title}" không?`)) {
      onDeletePlan(id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDuplicatePlan(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002D72] via-[#003B95] to-[#0d47a1] text-white p-6 sm:p-10 mb-8 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F27024]/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-orange-200 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#F27024]" />
            <span>AI Sư Phạm Chuẩn Công Văn 5512/BGDĐT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            KHBD STUDIO – FPT SCHOOLS
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Trợ lý đắc lực cho giáo viên FPT Schools biên soạn Kế hoạch bài dạy chi tiết. Hỗ trợ nạp tài liệu Word/PDF, phân tách rõ ràng Hoạt động GV – HS, dự kiến sản phẩm cụ thể và xuất Word chuẩn chỉnh.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewModal}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#F27024] hover:bg-[#ea580c] text-white shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Soạn bài mới cùng Gemini AI</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-blue-200 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hỗ trợ mọi môn học & khối lớp (GDCD, GDKTPL, Toán, Văn...)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-6 space-y-4">
        {/* Search input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bài, môn học, bộ sách..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewModal}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#002D72] hover:bg-[#00245a] text-white flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo KHBD</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Subjects */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Môn:
            </span>
            {SUBJECT_CATEGORIES.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedSubject === subj
                    ? 'bg-[#002D72] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Grades */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
              <GraduationCap className="w-3.5 h-3.5" /> Lớp:
            </span>
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedGrade === g
                    ? 'bg-[#F27024] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {typeof g === 'number' ? `Lớp ${g}` : g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            Chưa tìm thấy Kế hoạch bài dạy phù hợp
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Thầy/Cô có thể tạo bài dạy mới bằng trợ lý Gemini AI hoặc chọn lại bộ lọc môn học và khối lớp.
          </p>
          <button
            onClick={onOpenNewModal}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#F27024] text-white hover:bg-[#ea580c] transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Soạn bài mới ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const isGDKTPLorGDCD =
              plan.header.subject.includes('kinh tế') ||
              plan.header.subject.includes('công dân') ||
              plan.header.subject.includes('GDCD');

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#002D72]/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Accent Bar */}
                <div
                  className={`h-1.5 w-full ${
                    isGDKTPLorGDCD
                      ? 'bg-gradient-to-r from-[#F27024] to-[#ea580c]'
                      : 'bg-gradient-to-r from-[#002D72] to-[#0284c7]'
                  }`}
                />

                <div className="p-5 flex-1 flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#002D72]/10 text-[#002D72]">
                        {plan.header.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#F27024]/10 text-[#F27024]">
                        Khối {plan.header.grade}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {plan.header.durationPeriods} tiết
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#002D72] transition-colors line-clamp-2 mb-2">
                    {plan.header.lessonTitle}
                  </h3>

                  {/* Book Series & School */}
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                    {plan.header.bookSeries || 'Sách giáo khoa theo chuẩn 2018'} • {plan.schoolInfo?.schoolName || 'FPT Schools'}
                  </p>

                  {/* Activities summary */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Layers className="w-3.5 h-3.5 text-[#002D72]" />
                      {plan.activities?.length || 4} hoạt động dạy học
                    </span>
                    <span className="text-slate-400">
                      {plan.schoolInfo?.date || new Date(plan.header.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(e, plan.id)}
                      title="Nhân bản Kế hoạch bài dạy"
                      className="p-1.5 text-slate-500 hover:text-[#002D72] hover:bg-white rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, plan.id, plan.header.lessonTitle)}
                      title="Xóa Kế hoạch bài dạy"
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleExportDocx(e, plan)}
                      disabled={exportingId === plan.id}
                      title="Xuất file Word (.docx) chuẩn 5512"
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#002D72] transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Download className={`w-3.5 h-3.5 ${exportingId === plan.id ? 'animate-bounce text-[#F27024]' : 'text-slate-500'}`} />
                      <span>{exportingId === plan.id ? 'Đang xuất...' : 'Xuất Word'}</span>
                    </button>

                    <button
                      onClick={() => onSelectPlan(plan)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#002D72] hover:bg-[#00245a] text-white transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Chỉnh sửa</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
