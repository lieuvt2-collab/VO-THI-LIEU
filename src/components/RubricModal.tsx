import React, { useState } from 'react';
import { X, Award, Copy, Check, Table } from 'lucide-react';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
  rubric: {
    rubricTitle: string;
    criteria: Array<{
      name: string;
      weight: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
    }>;
  } | null;
}

export const RubricModal: React.FC<RubricModalProps> = ({ isOpen, onClose, rubric }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !rubric) return null;

  const handleCopy = () => {
    const text = `${rubric.rubricTitle}\n\n` +
      rubric.criteria
        .map(
          (c) =>
            `[${c.name}] (${c.weight}):\n- Mức 1 (Chưa đạt): ${c.level1}\n- Mức 2 (Đạt): ${c.level2}\n- Mức 3 (Khá): ${c.level3}\n- Mức 4 (Tốt): ${c.level4}\n`
        )
        .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#002D72] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F27024] flex items-center justify-center text-white font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">{rubric.rubricTitle || 'Bảng Tiêu Chí Đánh Giá (Rubric)'}</h2>
              <p className="text-xs text-blue-200">Chuẩn 4 mức độ đánh giá sản phẩm học tập theo quy định</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#002D72] text-white font-bold">
                <tr>
                  <th className="p-3 w-1/5">Tiêu chí (Trọng số)</th>
                  <th className="p-3 w-1/5 bg-slate-700">Mức 1: Chưa đạt</th>
                  <th className="p-3 w-1/5 bg-amber-600">Mức 2: Đạt</th>
                  <th className="p-3 w-1/5 bg-blue-600">Mức 3: Khá</th>
                  <th className="p-3 w-1/5 bg-emerald-600">Mức 4: Tốt / Xuất sắc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rubric.criteria.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50">
                      <div>{c.name}</div>
                      <span className="text-[10px] text-[#F27024] font-bold">{c.weight}</span>
                    </td>
                    <td className="p-3 text-slate-600">{c.level1}</td>
                    <td className="p-3 text-slate-600">{c.level2}</td>
                    <td className="p-3 text-slate-600">{c.level3}</td>
                    <td className="p-3 text-slate-600">{c.level4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Giáo viên có thể in kèm vào phụ lục hoặc sao chép vào sổ đánh giá học sinh.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#002D72] text-white hover:bg-[#00245a] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
