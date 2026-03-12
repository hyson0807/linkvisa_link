'use client';

import { DocumentRequirement } from '@/types/case';

export default function AIReviewResult({ doc }: { doc: DocumentRequirement }) {
  if (!doc.aiReviewComment) return null;

  const isApproved = doc.aiReviewStatus === 'approved';

  return (
    <div className={`mt-2 rounded-lg p-3 text-sm ${
      isApproved ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    }`}>
      <span className="font-medium">{isApproved ? 'AI 승인:' : 'AI 반려:'}</span>{' '}
      {doc.aiReviewComment}
    </div>
  );
}
