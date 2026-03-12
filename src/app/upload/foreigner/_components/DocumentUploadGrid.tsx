'use client';

import { Case } from '@/types/case';
import { FileHandle } from '@/types/case';
import DocumentUploadCard from './DocumentUploadCard';

interface Props {
  caseData: Case;
  onUpload: (docId: string, file: FileHandle) => void;
}

export default function DocumentUploadGrid({ caseData, onUpload }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {caseData.requiredDocuments.map((doc) => (
        <DocumentUploadCard key={doc.id} doc={doc} onUpload={onUpload} />
      ))}
    </div>
  );
}
