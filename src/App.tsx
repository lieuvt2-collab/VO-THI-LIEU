import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonList } from './components/LessonList';
import { LessonEditor } from './components/LessonEditor';
import { GenerateModal } from './components/GenerateModal';
import { LessonPlan } from './types/khbd';
import {
  getAllLessonPlans,
  saveLessonPlan,
  deleteLessonPlan,
  duplicateLessonPlan,
  resetToDefaults,
} from './services/storage';

export default function App() {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [activePlan, setActivePlan] = useState<LessonPlan | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  // Load plans on mount
  useEffect(() => {
    const loaded = getAllLessonPlans();
    setPlans(loaded);
  }, []);

  const refreshPlans = () => {
    const updated = getAllLessonPlans();
    setPlans(updated);
  };

  const handleSelectPlan = (plan: LessonPlan) => {
    setActivePlan(plan);
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePlan = (updatedPlan: LessonPlan) => {
    saveLessonPlan(updatedPlan);
    setActivePlan(updatedPlan);
    refreshPlans();
  };

  const handleDuplicatePlan = (id: string) => {
    const duplicated = duplicateLessonPlan(id);
    if (duplicated) {
      refreshPlans();
      handleSelectPlan(duplicated);
    }
  };

  const handleDeletePlan = (id: string) => {
    deleteLessonPlan(id);
    refreshPlans();
    if (activePlan?.id === id) {
      setActivePlan(null);
      setCurrentView('list');
    }
  };

  const handleResetSamples = () => {
    if (
      window.confirm(
        'Thầy/Cô có muốn nạp lại các bài dạy mẫu chuẩn FPT Schools (GDCD 6, GDKTPL 11...) không?'
      )
    ) {
      resetToDefaults();
      refreshPlans();
      alert('Đã nạp lại dữ liệu bài dạy mẫu thành công!');
    }
  };

  const handlePlanGenerated = (newPlan: LessonPlan) => {
    saveLessonPlan(newPlan);
    refreshPlans();
    handleSelectPlan(newPlan);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigateList={() => setCurrentView('list')}
        onOpenNewModal={() => setIsGenerateModalOpen(true)}
        onResetSamples={handleResetSamples}
        totalPlansCount={plans.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'list' ? (
          <LessonList
            plans={plans}
            onSelectPlan={handleSelectPlan}
            onOpenNewModal={() => setIsGenerateModalOpen(true)}
            onDuplicatePlan={handleDuplicatePlan}
            onDeletePlan={handleDeletePlan}
          />
        ) : activePlan ? (
          <LessonEditor
            lessonPlan={activePlan}
            onSave={handleSavePlan}
            onBack={() => setCurrentView('list')}
          />
        ) : (
          <div className="text-center py-20 text-slate-500">
            Không tìm thấy kế hoạch bài dạy.
          </div>
        )}
      </main>

      {/* AI Generation Modal */}
      <GenerateModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerated={handlePlanGenerated}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-slate-700">
            KHBD STUDIO – HỆ THỐNG GIÁO DỤC FPT SCHOOLS
          </p>
          <p>
            Phát triển trên nền tảng <span className="font-bold text-[#F27024]">Gemini AI</span> • Chuẩn Công văn 5512/BGDĐT
          </p>
        </div>
      </footer>
    </div>
  );
}
