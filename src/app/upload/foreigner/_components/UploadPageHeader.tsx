'use client';

import { Case } from '@/types/case';

export default function UploadPageHeader({ caseData }: { caseData: Case }) {
  const uploaded = caseData.requiredDocuments.filter((d) => d.uploaded).length;
  const total = caseData.requiredDocuments.length;

  return (
    <div className="text-center space-y-3">
      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary text-white font-bold">
        LV
      </div>
      <h1 className="text-2xl font-bold text-gray-900">서류 업로드</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        <span className="font-medium text-gray-900">{caseData.foreignerName}</span>님의{' '}
        <span className="font-medium text-gray-900">{caseData.visaType}</span> 비자 신청에 필요한 서류를 업로드해 주세요.
      </p>
      <div className="inline-flex items-center gap-2 rounded-full bg-white border px-4 py-2 text-sm">
        <span className="font-bold text-primary">{uploaded}</span>
        <span className="text-muted-foreground">/ {total}개 서류 업로드 완료</span>
      </div>
    </div>
  );
}
