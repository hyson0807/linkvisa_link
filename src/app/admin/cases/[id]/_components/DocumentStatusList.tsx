'use client';

import { useState } from 'react';
import { Case, DocumentRequirement } from '@/types/case';
import DocumentStatusItem from './DocumentStatusItem';
import AIReviewResult from './AIReviewResult';
import DocumentPreviewModal from './DocumentPreviewModal';

export default function DocumentStatusList({ caseData }: { caseData: Case }) {
  const [previewDoc, setPreviewDoc] = useState<DocumentRequirement | null>(null);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900">서류 현황</h2>
      <div className="space-y-2">
        {caseData.requiredDocuments.map((doc) => (
          <div key={doc.id}>
            <DocumentStatusItem
              doc={doc}
              onPreview={() => setPreviewDoc(doc)}
            />
            <AIReviewResult doc={doc} />
          </div>
        ))}
      </div>
      <DocumentPreviewModal
        doc={previewDoc}
        open={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
}
