import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  Target,
  FileQuestion,
  FileBox,
  Users,
  GraduationCap,
  Layers,
  Wand2,
  Loader2,
} from 'lucide-react';
import { Activity, ActivityStep } from '../types/khbd';
import { rewriteActivityWithMethod } from '../services/api';

interface ActivityCardProps {
  activity: Activity;
  activityIndex: number;
  subject: string;
  grade: number;
  lessonTitle: string;
  onUpdate: (updated: Activity) => void;
  onDelete?: () => void;
}

const REWRITE_METHODS = [
  'Kỹ thuật Khăn trải bàn (Think-Pair-Share)',
  'Kỹ thuật Mảnh ghép (Jigsaw)',
  'Dạy học theo Trạm (Station Learning)',
  'Đóng vai giải quyết tình huống (Role-Play)',
  'Phòng tranh - Gallery Walk',
  'Trò chơi tương tác số (Gamification)',
];

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  activityIndex,
  subject,
  grade,
  lessonTitle,
  onUpdate,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingMethod, setIsEditingMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(REWRITE_METHODS[0]);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  const letter = ['A', 'B', 'C', 'D'][activityIndex % 4] || `${activityIndex + 1}`;

  const handleStepChange = (
    stepIndex: number,
    field: 'teacherActivity' | 'studentActivity',
    value: string
  ) => {
    const newSteps = [...activity.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      [field]: value,
    };
    onUpdate({
      ...activity,
      steps: newSteps,
    });
  };

  const handleRewrite = async () => {
    try {
      setIsRewriting(true);
      setRewriteError(null);
      const updated = await rewriteActivityWithMethod({
        activity,
        method: selectedMethod,
        subject,
        grade,
        lessonTitle,
      });
      onUpdate(updated);
      setIsEditingMethod(false);
    } catch (err: any) {
      console.error(err);
      setRewriteError(err.message || 'Lỗi khi đổi mới phương pháp.');
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 mb-6">
      {/* Activity Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#002D72] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {letter}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-slate-800">
                {activity.title}
              </h3>
              {activity.teachingMethod && (
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-orange-50 text-[#F27024] border border-orange-200">
                  {activity.teachingMethod}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {activity.durationMinutes} phút
              </span>
              <span>•</span>
              <span>4 bước chuẩn Công văn 5512</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setIsEditingMethod(!isEditingMethod)}
            title="Đổi mới phương pháp dạy học bằng AI"
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-[#F27024] border border-orange-200 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đổi mới phương pháp AI</span>
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              title="Xóa hoạt động này"
              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Method Rewrite Banner (if toggled) */}
      {isEditingMethod && (
        <div className="p-4 bg-orange-50/70 border-b border-orange-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-[#002D72] flex items-center gap-1 shrink-0">
              <Wand2 className="w-4 h-4 text-[#F27024]" />
              Chọn kỹ thuật / phương pháp đổi mới:
            </span>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-orange-200 bg-white text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F27024]"
            >
              {REWRITE_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingMethod(false)}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-orange-100 transition-colors font-medium"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleRewrite}
              disabled={isRewriting}
              className="px-3.5 py-1.5 rounded-lg bg-[#F27024] hover:bg-[#ea580c] text-white font-semibold flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              {isRewriting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>AI đang viết lại...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Áp dụng ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {rewriteError && (
        <div className="p-3 bg-red-50 text-red-700 text-xs border-b border-red-200">
          {rewriteError}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 space-y-5 text-sm">
          {/* Title & Duration Edit */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tiêu đề hoạt động
              </label>
              <input
                type="text"
                value={activity.title}
                onChange={(e) => onUpdate({ ...activity, title: e.target.value })}
                className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Thời lượng (phút)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={activity.durationMinutes}
                onChange={(e) => onUpdate({ ...activity, durationMinutes: Number(e.target.value) || 10 })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72]"
              />
            </div>
          </div>

          {/* a. Mục tiêu */}
          <div>
            <label className="block text-xs font-bold text-[#002D72] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#F27024]" />
              a) Mục tiêu hoạt động
            </label>
            <textarea
              rows={2}
              value={activity.objective}
              onChange={(e) => onUpdate({ ...activity, objective: e.target.value })}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-y"
            />
          </div>

          {/* b. Nội dung */}
          <div>
            <label className="block text-xs font-bold text-[#002D72] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileQuestion className="w-3.5 h-3.5 text-[#002D72]" />
              b) Nội dung hoạt động (Nhiệm vụ giao cho học sinh)
            </label>
            <textarea
              rows={2}
              value={activity.content}
              onChange={(e) => onUpdate({ ...activity, content: e.target.value })}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-y"
            />
          </div>

          {/* c. Dự kiến sản phẩm học tập cụ thể */}
          <div className="p-3.5 rounded-xl bg-orange-50/40 border border-orange-200/80">
            <label className="block text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileBox className="w-4 h-4 text-[#F27024]" />
              c) Dự kiến sản phẩm học tập cụ thể (Bắt buộc chi tiết câu trả lời / bảng điền, không viết chung chung)
            </label>
            <textarea
              rows={3}
              value={activity.product}
              onChange={(e) => onUpdate({ ...activity, product: e.target.value })}
              placeholder="Ghi rõ đáp án phiếu học tập, kết quả câu trả lời của học sinh, bảng so sánh cụ thể..."
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#F27024] bg-white resize-y font-mono"
            />
          </div>

          {/* d. Tổ chức thực hiện: 4 Bước phân vai GV & HS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#002D72] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#002D72]" />
                d) Tổ chức thực hiện (4 bước chuẩn 5512 - Tách rõ Hoạt động GV & HS)
              </label>
            </div>

            <div className="space-y-4">
              {activity.steps.map((step, stepIndex) => (
                <div
                  key={step.stepNumber}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50"
                >
                  {/* Step Header */}
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
                    <span className="text-[#002D72]">{step.stepName}</span>
                    <span className="text-slate-400 font-normal">Bước {step.stepNumber} / 4</span>
                  </div>

                  {/* 2 Columns: GV vs HS */}
                  <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* GV */}
                    <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#002D72] mb-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#002D72]" />
                        <span>Hoạt động của Giáo viên</span>
                      </div>
                      <textarea
                        rows={3}
                        value={step.teacherActivity}
                        onChange={(e) =>
                          handleStepChange(stepIndex, 'teacherActivity', e.target.value)
                        }
                        placeholder="Nêu rõ GV giao nhiệm vụ gì, hướng dẫn và chốt kiến thức ra sao..."
                        className="w-full p-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002D72] resize-y flex-1"
                      />
                    </div>

                    {/* HS */}
                    <div className="bg-white p-3 rounded-lg border border-orange-100 flex flex-col">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#ea580c] mb-1.5">
                        <Users className="w-3.5 h-3.5 text-[#F27024]" />
                        <span>Hoạt động của Học sinh</span>
                      </div>
                      <textarea
                        rows={3}
                        value={step.studentActivity}
                        onChange={(e) =>
                          handleStepChange(stepIndex, 'studentActivity', e.target.value)
                        }
                        placeholder="Nêu rõ HS tiếp nhận, thảo luận nhóm, trình bày và ghi chép nội dung gì..."
                        className="w-full p-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#F27024] resize-y flex-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
