export interface SchoolInfo {
  schoolName: string;
  department: string;
  teacherName: string;
  schoolYear: string;
  date: string;
}

export interface LessonHeader {
  id: string;
  subject: string;
  grade: number;
  bookSeries: string;
  lessonTitle: string;
  durationPeriods: number;
  lessonNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneralCompetencies {
  selfReliance: string[]; // Tự chủ và tự học
  communication: string[]; // Giao tiếp và hợp tác
  problemSolving: string[]; // Giải quyết vấn đề và sáng tạo
}

export interface Qualities {
  patriotism: string; // Yêu nước
  compassion: string; // Nhân ái
  diligence: string; // Chăm chỉ
  honesty: string; // Trung thực
  responsibility: string; // Trách nhiệm
}

export interface SectionObjectives {
  knowledge: string[];
  generalCompetencies: GeneralCompetencies;
  specificCompetencies: string[];
  qualities: Qualities;
  integration: string[];
}

export interface SectionEquipment {
  teacherEquipment: string[];
  studentEquipment: string[];
}

export interface ActivityStep {
  stepNumber: 1 | 2 | 3 | 4;
  stepName: string;
  teacherActivity: string; // Hoạt động của giáo viên
  studentActivity: string; // Hoạt động của học sinh
}

export interface Activity {
  id: string;
  type: 'warmup' | 'discovery' | 'practice' | 'application';
  title: string;
  durationMinutes: number;
  objective: string;
  content: string;
  product: string; // Dự kiến sản phẩm học tập cụ thể, không chung chung
  steps: ActivityStep[]; // 4 bước chuẩn 5512
  teachingMethod?: string; // Khăn trải bàn, Mảnh ghép, Trạm, Đóng vai...
}

export interface LessonPlan {
  id: string;
  header: LessonHeader;
  schoolInfo: SchoolInfo;
  objectives: SectionObjectives;
  equipment: SectionEquipment;
  activities: Activity[];
  notes?: string;
  sourceDocName?: string;
  sourceDocSummary?: string;
}

export interface AuditItem {
  id: string;
  title: string;
  criterion: string;
  passed: boolean;
  score: number;
  comment: string;
  suggestedFix?: string;
}

export interface AuditResult {
  overallScore: number; // 0 - 100
  verdict: 'XuatSac' | 'DatChuan' | 'CanDieuChinh';
  summary: string;
  items: AuditItem[];
  strengths: string[];
  improvements: string[];
  canAutoFix: boolean;
}

export interface GenerateKHBDRequest {
  subject: string;
  grade: number;
  lessonTitle: string;
  durationPeriods: number;
  bookSeries: string;
  sourceText?: string;
  pdfBase64?: string;
  pdfMimeType?: string;
  pedagogicalFocus?: string;
  specialInstructions?: string;
}
