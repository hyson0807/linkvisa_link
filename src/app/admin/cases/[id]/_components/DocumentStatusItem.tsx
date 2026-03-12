'use client';

import { DocumentRequirement } from '@/types/case';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  doc: DocumentRequirement;
  onPreview?: () => void;
}

export default function DocumentStatusItem({ doc, onPreview }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
        doc.uploaded ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
      }`}>
        {doc.uploaded ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{doc.name}</p>
        {doc.uploaded && doc.fileName ? (
          <p className="text-sm text-muted-foreground truncate">{doc.fileName}</p>
        ) : (
          <p className="text-sm text-muted-foreground">미업로드</p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {doc.aiReviewStatus === 'approved' && (
          <Badge className="bg-green-50 text-green-700 hover:bg-green-50">승인</Badge>
        )}
        {doc.aiReviewStatus === 'rejected' && (
          <Badge className="bg-red-50 text-red-700 hover:bg-red-50">반려</Badge>
        )}
        {doc.aiReviewStatus === 'pending' && (
          <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">검토중</Badge>
        )}
        {doc.uploaded && doc.file && (
          <Button variant="ghost" size="sm" onClick={onPreview} className="text-primary">
            미리보기
          </Button>
        )}
      </div>
    </div>
  );
}
