
export interface GuidelineSection {
  heading: string;
  body: string[];
}

export interface GuidelineCategory {
  id: string;
  label: string;
  description?: string;
  colorClass?: string;
}

export interface Guideline {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  updatedAt?: string;
  colorClass?: string;
  sections: GuidelineSection[];
}