
export interface Subject {
  id: string;
  name: string;
  category: string;
  studied: boolean;
  reviewed: boolean;
  practiced: boolean;
}

export interface QuestionRecord {
  id: string;
  subjectId: string;
  date: string;
  correct: number;
  total: number;
}

export interface StudyData {
  subjects: Subject[];
  totalSubjects: number;
  studiedCount: number;
  reviewedCount: number;
  practicedCount: number;
  questionRecords: QuestionRecord[];
}

export interface CategoryProgress {
  category: string;
  total: number;
  studied: number;
  reviewed: number;
  practiced: number;
  completion: number;
}

export interface SubjectQuestionStats {
  subjectId: string;
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
}
