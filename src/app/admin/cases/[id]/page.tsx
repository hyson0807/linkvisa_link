'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCaseStore } from '@/store/case-store';
import { Button } from '@/components/ui/button';
import CaseHeader from './_components/CaseHeader';
import CaseLinkCard from './_components/CaseLinkCard';
import DocumentStatusList from './_components/DocumentStatusList';
import AISummaryModal from './_components/AISummaryModal';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const caseData = useCaseStore((s) => s.getCase(caseId));
  const runAIReview = useCaseStore((s) => s.runAIReview);
  const [reviewing, setReviewing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">케이스를 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push('/admin')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const handleAIReview = async () => {
    setReviewing(true);
    await runAIReview(caseId);
    setReviewing(false);
  };

  const hasUploaded = caseData.requiredDocuments.some((d) => d.uploaded);

  return (
    <div className="space-y-6">
      <button onClick={() => router.push('/admin')} className="text-sm text-muted-foreground hover:text-gray-900 transition-colors">
        ← 목록으로 돌아가기
      </button>

      <div className="flex items-center justify-between">
        <CaseHeader caseData={caseData} />
        {caseData.status === '완료' && (
          <Button
            variant="default"
            className="h-10 rounded-xl px-5 text-sm font-semibold gap-2"
            onClick={() => setShowSummary(true)}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
            </svg>
            AI 요약
          </Button>
        )}
      </div>
      <CaseLinkCard caseData={caseData} />
      <DocumentStatusList caseData={caseData} />

      {hasUploaded && (
        <div className="flex justify-end">
          <Button
            size="lg"
            className="h-12 rounded-xl px-8 text-base font-semibold"
            onClick={handleAIReview}
            disabled={reviewing}
          >
            {reviewing ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI 검토 중...
              </span>
            ) : (
              'AI 검토 시작'
            )}
          </Button>
        </div>
      )}

      <AISummaryModal
        open={showSummary}
        onOpenChange={setShowSummary}
        caseData={caseData}
      />
    </div>
  );
}
