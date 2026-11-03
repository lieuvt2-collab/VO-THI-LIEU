import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Loader2,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AuditResult, LessonPlan } from '../types/khbd';
import { autoFixKHBDFromAudit } from '../services/api';

interface AuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  auditResult: AuditResult | null;
  isLoading: boolean;
  lessonPlan: LessonPlan;
  onPlanUpdated: (updatedPlan: LessonPlan) => void;
}

export const AuditDrawer: React.FC<AuditDrawerProps> = ({
  isOpen,
  onClose,
  auditResult,
  isLoading,
  lessonPlan,
  onPlanUpdated,
}) => {
  const [isFixing, setIsFixing] = useState(false);
  const [fixError, setFixError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAutoFix = async () => {
    if (!auditResult) return;
    try {
      setIsFixing(true);
      setFixError(null);
      const fixed = await autoFixKHBDFromAudit(lessonPlan, auditResult);
      onPlanUpdated(fixed);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
      });
      onClose();
    } catch (err: any) {
      console.error('Auto fix error:', err);
      setFixError(err.message || 'Lỗi khi tự động nâng cấp KHBD.');
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#002D72] to-[#003B95] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F27024] flex items-center justify-center text-white font-bold shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Thẩm Định Tính Logic & Chuẩn 5512</h2>
              <p className="text-xs text-blue-200">
                Kiểm tra Mục tiêu - Tiến trình - Phân vai GV/HS - Dự kiến sản phẩm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {isLoading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#F27024] mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800">
                AI đang rà soát toàn bộ Kế hoạch bài dạy...
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Đối chiếu tiêu chí Công văn 5512 và tính sư phạm thực tế
              </p>
            </div>
          ) : !auditResult ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Chưa có dữ liệu thẩm định.
            </div>
          ) : (
            <>
              {/* Score Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Điểm đánh giá sư phạm
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-[#002D72]">
                      {auditResult.overallScore}
                    </span>
                    <span className="text-sm text-slate-400 font-semibold">/ 100</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#002D72] text-white">
                    <Award className="w-3.5 h-3.5 text-yellow-400" />
                    <span>
                      {auditResult.verdict === 'XuatSac'
                        ? 'ĐẠT CHUẨN XUẤT SẮC'
                        : auditResult.verdict === 'DatChuan'
                        ? 'ĐẠT CHUẨN 5512'
                        : 'CẦN ĐIỀU CHỈNH'}
                    </span>
                  </div>
                </div>

                <div className="text-right max-w-xs">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {auditResult.summary}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              {auditResult.strengths?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Điểm mạnh nổi bật ({auditResult.strengths.length})
                  </h4>
                  <ul className="space-y-2">
                    {auditResult.strengths.map((str, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-xl flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {auditResult.improvements?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#F27024]" />
                    Điểm cần hoàn thiện thêm ({auditResult.improvements.length})
                  </h4>
                  <ul className="space-y-2">
                    {auditResult.improvements.map((imp, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 bg-orange-50/60 border border-orange-100 p-2.5 rounded-xl flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F27024] shrink-0 mt-1.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Criteria Checklist */}
              {auditResult.items?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Bảng kiểm định chi tiết theo tiêu chuẩn 5512
                  </h4>
                  <div className="space-y-3">
                    {auditResult.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-slate-900">{item.title}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.passed
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {item.score}/100
                          </span>
                        </div>
                        <p className="text-slate-500">{item.comment}</p>
                        {item.suggestedFix && (
                          <p className="text-[#002D72] bg-blue-50/60 p-2 rounded-lg font-medium">
                            💡 <strong>Gợi ý:</strong> {item.suggestedFix}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fixError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {fixError}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with Auto-Fix Button */}
        {auditResult && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Đóng
            </button>

            <button
              onClick={handleAutoFix}
              disabled={isFixing}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#002D72] to-[#003B95] hover:from-[#00245a] hover:to-[#002D72] text-white shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isFixing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>AI đang tự động khắc phục...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Tự động tối ưu KHBD bằng AI</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
