'use client';

import { Case } from '@/types/case';
import StatusBadge from '@/app/admin/_components/StatusBadge';

export default function CaseHeader({ caseData }: { caseData: Case }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{caseData.foreignerName}</h1>
          <StatusBadge status={caseData.status} />
        </div>
        <p className="text-muted-foreground mt-1">
          {caseData.nationality} · {caseData.visaType} · {new Date(caseData.createdAt).toLocaleDateString('ko-KR')}
        </p>
      </div>
    </div>
  );
}
