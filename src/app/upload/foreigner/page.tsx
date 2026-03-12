'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useCaseStore } from '@/store/case-store';
import { FileHandle } from '@/types/case';
import UploadPageHeader from './_components/UploadPageHeader';
import DocumentUploadGrid from './_components/DocumentUploadGrid';

function UploadContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');
  const caseData = useCaseStore((s) => (caseId ? s.getCase(caseId) : undefined));
  const uploadDocument = useCaseStore((s) => s.uploadDocument);

  if (!caseId || !caseData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-5xl mb-4">🔗</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">유효하지 않은 링크입니다</h1>
        <p className="text-muted-foreground text-center">
          관리자에게 올바른 업로드 링크를 요청하세요.
        </p>
      </div>
    );
  }

  const handleUpload = (docId: string, file: FileHandle) => {
    uploadDocument(caseId, docId, file);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-8">
        <UploadPageHeader caseData={caseData} />
        <DocumentUploadGrid caseData={caseData} onUpload={handleUpload} />
      </div>
    </div>
  );
}

export default function UploadForeignerPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-lg">로딩 중...</div>
      </div>
    }>
      <UploadContent />
    </Suspense>
  );
}
