import React from 'react';
import { BookOpen, Sparkles, Plus, FolderHeart, RotateCcw, FileText, Download } from 'lucide-react';

interface NavbarProps {
  currentView: 'list' | 'editor';
  onNavigateList: () => void;
  onOpenNewModal: () => void;
  onResetSamples: () => void;
  totalPlansCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateList,
  onOpenNewModal,
  onResetSamples,
  totalPlansCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div
            onClick={onNavigateList}
            className="flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F27024] to-[#ea580c] flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[#002D72]">
                  KHBD STUDIO
                </span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-[#F27024]/10 text-[#F27024] border border-[#F27024]/20">
                  FPT SCHOOLS
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Soạn Kế hoạch bài dạy chuẩn Công văn 5512 với Gemini AI
              </p>
            </div>
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateList}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'list'
                  ? 'bg-blue-50 text-[#002D72] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderHeart className="w-4 h-4 text-[#002D72]" />
              <span className="hidden md:inline">Kho bài dạy</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-700 text-xs rounded-full font-bold">
                {totalPlansCount}
              </span>
            </button>

            <button
              onClick={onResetSamples}
              title="Khôi phục các bài giảng mẫu chuẩn FPT (GDCD 6, GDKTPL 11...)"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 hidden lg:flex"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Nạp bài mẫu</span>
            </button>

            <button
              onClick={onOpenNewModal}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#F27024] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white shadow-sm shadow-orange-500/25 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Soạn bài mới AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
