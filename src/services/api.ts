import { LessonPlan, AuditResult, Activity, GenerateKHBDRequest } from '../types/khbd';

export async function extractDocumentFile(file: File): Promise<{
  fileName: string;
  fileSize: number;
  fileType: string;
  extractedText: string;
  isPdf: boolean;
  pdfBase64?: string;
}> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/extract-doc', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi tải file' }));
    throw new Error(errorData.error || 'Không thể trích xuất nội dung tài liệu.');
  }

  return await res.json();
}

export async function generateKHBDFromAI(data: GenerateKHBDRequest): Promise<LessonPlan> {
  const res = await fetch('/api/generate-khbd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi máy chủ' }));
    throw new Error(errorData.error || 'Lỗi khi yêu cầu AI tạo KHBD.');
  }

  const json = await res.json();
  return json.lessonPlan;
}

export async function auditKHBD(lessonPlan: LessonPlan): Promise<AuditResult> {
  const res = await fetch('/api/ai-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'audit',
      payload: { lessonPlan },
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi thẩm định' }));
    throw new Error(errorData.error || 'Lỗi khi thẩm định KHBD.');
  }

  const json = await res.json();
  return json.audit;
}

export async function rewriteActivityWithMethod(payload: {
  activity: Activity;
  method: string;
  subject: string;
  grade: number;
  lessonTitle: string;
}): Promise<Activity> {
  const res = await fetch('/api/ai-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'rewrite-activity',
      payload,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi viết lại' }));
    throw new Error(errorData.error || 'Lỗi khi đổi mới phương pháp hoạt động.');
  }

  const json = await res.json();
  return json.activity;
}

export async function autoFixKHBDFromAudit(lessonPlan: LessonPlan, audit: AuditResult): Promise<LessonPlan> {
  const res = await fetch('/api/ai-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'auto-fix-audit',
      payload: { lessonPlan, audit },
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi tối ưu tự động' }));
    throw new Error(errorData.error || 'Lỗi khi tối ưu KHBD.');
  }

  const json = await res.json();
  return json.lessonPlan;
}

export async function generateLessonRubric(lessonPlan: LessonPlan): Promise<any> {
  const res = await fetch('/api/ai-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'add-rubric',
      payload: { lessonPlan },
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Lỗi tạo Rubric' }));
    throw new Error(errorData.error || 'Lỗi khi tạo bảng Rubric.');
  }

  const json = await res.json();
  return json.rubric;
}
