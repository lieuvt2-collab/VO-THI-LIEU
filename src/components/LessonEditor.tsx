import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Download,
  ShieldCheck,
  Award,
  Printer,
  Plus,
  Sparkles,
  Layers,
  Target,
  FileBox,
  School,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonPlan, Activity, AuditResult } from '../types/khbd';
import { exportLessonPlanToDocx } from '../services/docxExport';
import { auditKHBD, generateLessonRubric } from '../services/api';
import { ActivityCard } from './ActivityCard';
import { AuditDrawer } from './AuditDrawer';
import { RubricModal } from './RubricModal';
import { PrintPreviewModal } from './PrintPreviewModal';

interface LessonEditorProps {
  lessonPlan: LessonPlan;
  onSave: (updatedPlan: LessonPlan) => void;
  onBack: () => void;
}

export const LessonEditor: React.FC<LessonEditorProps> = ({
  lessonPlan: initialPlan,
  onSave,
  onBack,
}) => {
  const [plan, setPlan] = useState<LessonPlan>(initialPlan);
  const [activeTab, setActiveTab] = useState<'info' | 'objectives' | 'equipment' | 'activities'>('activities');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // AI Audit drawer state
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Rubric modal state
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const [isGeneratingRubric, setIsGeneratingRubric] = useState(false);
  const [rubricData, setRubricData] = useState<any | null>(null);

  // Print preview state
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);

  const handleSave = () => {
    onSave(plan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      await exportLessonPlanToDocx(plan);
    } catch (e) {
      console.error(e);
      alert('Không thể xuất file Word.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRunAudit = async () => {
    setIsAuditOpen(true);
    try {
      setIsAuditing(true);
      const res = await auditKHBD(plan);
      setAuditResult(res);
    } catch (e) {
      console.error(e);
      alert('Không thể thực hiện thẩm định AI.');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleGenerateRubric = async () => {
    try {
      setIsGeneratingRubric(true);
      const rubric = await generateLessonRubric(plan);
      setRubricData(rubric);
      setIsRubricOpen(true);
    } catch (e) {
      console.error(e);
      alert('Không thể tạo bảng Rubric.');
    } finally {
      setIsGeneratingRubric(false);
    }
  };

  const handleAddActivity = () => {
    const newIndex = plan.activities.length + 1;
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'discovery',
      title: `Hoạt động ${newIndex}: Mở rộng kiến thức / Dự án thực hành`,
      durationMinutes: 15,
      objective: 'Học sinh phân tích sâu và vận dụng giải quyết tình huống thực tiễn.',
      content: 'Làm việc theo nhóm giải quyết phiếu học tập số 4.',
      product: 'Bản đề xuất giải pháp chi tiết của nhóm kèm số liệu minh chứng.',
      teachingMethod: 'Dạy học giải quyết vấn đề',
      steps: [
        {
          stepNumber: 1,
          stepName: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherActivity: 'GV giao nhiệm vụ, phát phiếu bài tập và hướng dẫn thời gian 10 phút.',
          studentActivity: 'HS nhận nhiệm vụ, bầu nhóm trưởng và thư ký ghi chép.',
        },
        {
          stepNumber: 2,
          stepName: 'Bước 2: Thực hiện nhiệm vụ',
          teacherActivity: 'GV quan sát, kịp thời gợi mở và hỗ trợ các nhóm gặp khó khăn.',
          studentActivity: 'Các thành viên trong nhóm tích cực thảo luận, đưa ra ý kiến phản biện.',
        },
        {
          stepNumber: 3,
          stepName: 'Bước 3: Báo cáo, thảo luận',
          teacherActivity: 'GV điều hành phần trình bày và mời nhóm khác nhận xét.',
          studentActivity: 'Đại diện nhóm báo cáo, các nhóm còn lại đặt câu hỏi chất vấn văn minh.',
        },
        {
          stepNumber: 4,
          stepName: 'Bước 4: Kết luận, nhận định',
          teacherActivity: 'GV chuẩn hóa kiến thức trọng tâm, đánh giá tinh thần làm việc của các nhóm.',
          studentActivity: 'HS đối chiếu sản phẩm, tự rút kinh nghiệm và ghi bài vào vở.',
        },
      ],
    };

    setPlan({
      ...plan,
      activities: [...plan.activities, newAct],
    });
  };

  const handleUpdateActivity = (index: number, updated: Activity) => {
    const newActs = [...plan.activities];
    newActs[index] = updated;
    setPlan({ ...plan, activities: newActs });
  };

  const handleDeleteActivity = (index: number) => {
    if (plan.activities.length <= 1) {
      alert('Kế hoạch bài dạy cần có ít nhất 1 hoạt động dạy học.');
      return;
    }
    if (window.confirm('Thầy/Cô có muốn xóa hoạt động này?')) {
      const newActs = plan.activities.filter((_, i) => i !== index);
      setPlan({ ...plan, activities: newActs });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Top sticky action header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Quay lại danh sách"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#002D72]/10 text-[#002D72]">
                {plan.header.subject}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#F27024]/10 text-[#F27024]">
                Lớp {plan.header.grade}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {plan.header.durationPeriods} tiết
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 mt-0.5">
              {plan.header.lessonTitle}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            onClick={handleRunAudit}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-[#002D72] hover:bg-blue-100 border border-blue-200 flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#002D72]" />
            <span>Thẩm định 5512 AI</span>
          </button>

          <button
            onClick={handleGenerateRubric}
            disabled={isGeneratingRubric}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Award className="w-4 h-4 text-[#F27024]" />
            <span>{isGeneratingRubric ? 'Đang tạo Rubric...' : 'Bảng Rubric AI'}</span>
          </button>

          <button
            onClick={() => setIsPrintPreviewOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Xem trước in</span>
          </button>

          <button
            onClick={handleExportWord}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-[#002D72] text-[#002D72] hover:bg-blue-50 flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang xuất...' : 'Xuất Word (.docx)'}</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F27024] hover:bg-[#ea580c] text-white flex items-center gap-1.5 shadow-sm shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'Đã lưu!' : 'Lưu KHBD'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Kế hoạch bài dạy đã được lưu thành công vào kho dữ liệu FPT Schools!</span>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'activities'
              ? 'bg-[#002D72] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>III. Tiến trình dạy học ({plan.activities.length} hoạt động)</span>
        </button>

        <button
          onClick={() => setActiveTab('objectives')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'objectives'
              ? 'bg-[#002D72] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>I. Mục tiêu bài dạy</span>
        </button>

        <button
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'equipment'
              ? 'bg-[#002D72] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileBox className="w-4 h-4" />
          <span>II. Thiết bị & Học liệu</span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'info'
              ? 'bg-[#002D72] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Thông tin chung & Hành chính</span>
        </button>
      </div>

      {/* TAB 1: ACTIVITIES (III. TIẾN TRÌNH DẠY HỌC) */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#002D72] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F27024]" />
                III. TIẾN TRÌNH DẠY HỌC (CHUẨN CÔNG VĂN 5512)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mỗi hoạt động gồm Mục tiêu, Nội dung, Dự kiến sản phẩm cụ thể và 4 bước phân vai GV & HS rõ ràng.
              </p>
            </div>

            <button
              onClick={handleAddActivity}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:border-[#002D72] text-[#002D72] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm hoạt động</span>
            </button>
          </div>

          <div className="space-y-4">
            {plan.activities.map((act, index) => (
              <ActivityCard
                key={act.id}
                activity={act}
                activityIndex={index}
                subject={plan.header.subject}
                grade={plan.header.grade}
                lessonTitle={plan.header.lessonTitle}
                onUpdate={(updated) => handleUpdateActivity(index, updated)}
                onDelete={() => handleDeleteActivity(index)}
              />
            ))}
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={handleAddActivity}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white border-2 border-dashed border-slate-300 hover:border-[#F27024] text-slate-600 hover:text-[#F27024] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm hoạt động dạy học mới</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: OBJECTIVES (I. MỤC TIÊU) */}
      {activeTab === 'objectives' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#002D72] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#F27024]" />
              I. MỤC TIÊU BÀI DẠY
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Xác định rõ ràng chuẩn Kiến thức, Năng lực chung, Năng lực đặc thù, Phẩm chất và Tích hợp liên môn.
            </p>
          </div>

          {/* 1. Kiến thức */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Về kiến thức (Mỗi ý một dòng)
            </label>
            <textarea
              rows={4}
              value={plan.objectives.knowledge.join('\n')}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  objectives: {
                    ...plan.objectives,
                    knowledge: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                  },
                })
              }
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-y"
            />
          </div>

          {/* 2. Năng lực */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-[#002D72] uppercase tracking-wider">
              2. Về năng lực
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tự chủ và tự học
                </label>
                <textarea
                  rows={3}
                  value={plan.objectives.generalCompetencies.selfReliance.join('\n')}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        generalCompetencies: {
                          ...plan.objectives.generalCompetencies,
                          selfReliance: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                        },
                      },
                    })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Giao tiếp và hợp tác
                </label>
                <textarea
                  rows={3}
                  value={plan.objectives.generalCompetencies.communication.join('\n')}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        generalCompetencies: {
                          ...plan.objectives.generalCompetencies,
                          communication: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                        },
                      },
                    })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Giải quyết vấn đề và sáng tạo
                </label>
                <textarea
                  rows={3}
                  value={plan.objectives.generalCompetencies.problemSolving.join('\n')}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        generalCompetencies: {
                          ...plan.objectives.generalCompetencies,
                          problemSolving: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                        },
                      },
                    })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Năng lực đặc thù môn học (ví dụ: Năng lực điều chỉnh hành vi, Năng lực tìm hiểu KT-PL...)
              </label>
              <textarea
                rows={3}
                value={plan.objectives.specificCompetencies.join('\n')}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    objectives: {
                      ...plan.objectives,
                      specificCompetencies: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                    },
                  })
                }
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72]"
              />
            </div>
          </div>

          {/* 3. Phẩm chất */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-[#002D72] uppercase tracking-wider">
              3. Về phẩm chất
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Yêu nước</label>
                <input
                  type="text"
                  value={plan.objectives.qualities.patriotism}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        qualities: { ...plan.objectives.qualities, patriotism: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Nhân ái</label>
                <input
                  type="text"
                  value={plan.objectives.qualities.compassion}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        qualities: { ...plan.objectives.qualities, compassion: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Chăm chỉ</label>
                <input
                  type="text"
                  value={plan.objectives.qualities.diligence}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        qualities: { ...plan.objectives.qualities, diligence: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Trung thực</label>
                <input
                  type="text"
                  value={plan.objectives.qualities.honesty}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        qualities: { ...plan.objectives.qualities, honesty: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-600 mb-1">Trách nhiệm</label>
                <input
                  type="text"
                  value={plan.objectives.qualities.responsibility}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      objectives: {
                        ...plan.objectives,
                        qualities: { ...plan.objectives.qualities, responsibility: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* 4. Tích hợp */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              4. Tích hợp liên môn & Chuyển đổi số FPT (Mỗi ý một dòng)
            </label>
            <textarea
              rows={3}
              value={plan.objectives.integration.join('\n')}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  objectives: {
                    ...plan.objectives,
                    integration: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                  },
                })
              }
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72]"
            />
          </div>
        </div>
      )}

      {/* TAB 3: EQUIPMENT (II. THIẾT BỊ & HỌC LIỆU) */}
      {activeTab === 'equipment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#002D72] flex items-center gap-2">
              <FileBox className="w-5 h-5 text-[#F27024]" />
              II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân định rõ phương tiện, học liệu số, phiếu học tập của giáo viên và học sinh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#002D72] uppercase tracking-wider mb-2">
                1. Đối với Giáo viên (Mỗi phương tiện một dòng)
              </label>
              <textarea
                rows={6}
                value={plan.equipment.teacherEquipment.join('\n')}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    equipment: {
                      ...plan.equipment,
                      teacherEquipment: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                    },
                  })
                }
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                2. Đối với Học sinh (Mỗi đồ dùng/học liệu một dòng)
              </label>
              <textarea
                rows={6}
                value={plan.equipment.studentEquipment.join('\n')}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    equipment: {
                      ...plan.equipment,
                      studentEquipment: e.target.value.split('\n').filter((x) => x.trim().length > 0),
                    },
                  })
                }
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F27024]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GENERAL INFO & ADMINISTRATIVE */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#002D72] flex items-center gap-2">
              <School className="w-5 h-5 text-[#F27024]" />
              THÔNG TIN TRƯỜNG LỚP & HÀNH CHÍNH
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Thông tin sẽ xuất hiện trên phần tiêu đề và trang bìa của file Word (.docx).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tên trường
              </label>
              <input
                type="text"
                value={plan.schoolInfo.schoolName}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    schoolInfo: { ...plan.schoolInfo, schoolName: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tổ chuyên môn
              </label>
              <input
                type="text"
                value={plan.schoolInfo.department}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    schoolInfo: { ...plan.schoolInfo, department: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Giáo viên thực hiện
              </label>
              <input
                type="text"
                value={plan.schoolInfo.teacherName}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    schoolInfo: { ...plan.schoolInfo, teacherName: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ngày soạn
              </label>
              <input
                type="text"
                value={plan.schoolInfo.date}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    schoolInfo: { ...plan.schoolInfo, date: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Môn học
              </label>
              <input
                type="text"
                value={plan.header.subject}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    header: { ...plan.header, subject: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Khối lớp
              </label>
              <input
                type="number"
                value={plan.header.grade}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    header: { ...plan.header, grade: Number(e.target.value) || 10 },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tên bài học
              </label>
              <input
                type="text"
                value={plan.header.lessonTitle}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    header: { ...plan.header, lessonTitle: e.target.value },
                  })
                }
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Audit Drawer */}
      <AuditDrawer
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        auditResult={auditResult}
        isLoading={isAuditing}
        lessonPlan={plan}
        onPlanUpdated={(updated) => {
          setPlan(updated);
          onSave(updated);
        }}
      />

      {/* Rubric Modal */}
      <RubricModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
        rubric={rubricData}
      />

      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        lessonPlan={plan}
      />
    </div>
  );
};
