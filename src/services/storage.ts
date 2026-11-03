import { LessonPlan } from '../types/khbd';
import { SAMPLE_LESSONS } from '../data/sampleLessons';

const STORAGE_KEY = 'khbd_studio_fpt_plans_v1';

export function getAllLessonPlans(): LessonPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time loading - seed with sample lessons
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_LESSONS));
      return SAMPLE_LESSONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_LESSONS));
      return SAMPLE_LESSONS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load lesson plans from localStorage:', e);
    return SAMPLE_LESSONS;
  }
}

export function getLessonPlanById(id: string): LessonPlan | undefined {
  const plans = getAllLessonPlans();
  return plans.find((p) => p.id === id);
}

export function saveLessonPlan(plan: LessonPlan): void {
  const plans = getAllLessonPlans();
  const index = plans.findIndex((p) => p.id === plan.id);
  const updatedPlan = {
    ...plan,
    header: {
      ...plan.header,
      updatedAt: new Date().toISOString(),
    },
  };

  if (index >= 0) {
    plans[index] = updatedPlan;
  } else {
    plans.unshift(updatedPlan);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function deleteLessonPlan(id: string): void {
  const plans = getAllLessonPlans().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function duplicateLessonPlan(id: string): LessonPlan | undefined {
  const plans = getAllLessonPlans();
  const source = plans.find((p) => p.id === id);
  if (!source) return undefined;

  const newId = `khbd-${Date.now()}`;
  const duplicated: LessonPlan = JSON.parse(JSON.stringify(source));
  duplicated.id = newId;
  duplicated.header.id = newId;
  duplicated.header.lessonTitle = `${duplicated.header.lessonTitle} (Bản sao)`;
  duplicated.header.createdAt = new Date().toISOString();
  duplicated.header.updatedAt = new Date().toISOString();

  // refresh activity ids
  duplicated.activities = duplicated.activities.map((a, i) => ({
    ...a,
    id: `act-${i + 1}-${Date.now()}`,
  }));

  plans.unshift(duplicated);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  return duplicated;
}

export function exportAllToJson(): string {
  const plans = getAllLessonPlans();
  return JSON.stringify(plans, null, 2);
}

export function importFromJson(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed) && parsed.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function resetToDefaults(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_LESSONS));
}
