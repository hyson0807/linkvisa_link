export interface FileHandle {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  uploaded: boolean;
  file?: FileHandle;
  fileName?: string;
  uploadedAt?: string;
  aiReviewStatus?: 'pending' | 'approved' | 'rejected';
  aiReviewComment?: string;
}

export interface Case {
  id: string;
  foreignerName: string;
  nationality: string;
  visaType: string;
  status: '대기' | '검토중' | '완료';
  requiredDocuments: DocumentRequirement[];
  createdAt: string;
  uploadLink: string;
}
