
export interface Subject {
  id: string;
  name: string;
  category: string;
  studied: boolean;
  reviewed: boolean;
  practiced: boolean;
}

export interface StudyData {
  subjects: Subject[];
  totalSubjects: number;
  studiedCount: number;
  reviewedCount: number;
  practicedCount: number;
}

export interface CategoryProgress {
  category: string;
  total: number;
  studied: number;
  reviewed: number;
  practiced: number;
  completion: number;
}
