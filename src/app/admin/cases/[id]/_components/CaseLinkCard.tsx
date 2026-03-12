'use client';

import { useState } from 'react';
import { Case } from '@/types/case';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function CaseLinkCard({ caseData }: { caseData: Case }) {
  const uploaded = caseData.requiredDocuments.filter((d) => d.uploaded).length;
  const total = caseData.requiredDocuments.length;

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${caseData.uploadLink}`
    : caseData.uploadLink;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    toast.success('링크가 클립보드에 복사되었습니다.');
  };

  const handleOpen = () => {
    window.open(caseData.uploadLink, '_blank');
  };

  return (
    <Card className="rounded-2xl border-2 border-primary/20 bg-primary/[0.02]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">외국인에게 링크 보내기</h3>
          </div>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {uploaded}/{total} {uploaded === total && total > 0 ? '완료' : '대기'}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          아래 링크를 외국인에게 전달하면, 외국인이 직접 필요 서류를 업로드할 수 있습니다.
        </p>

        <div className="flex items-center gap-2 rounded-xl bg-gray-50 border p-3">
          <code className="flex-1 text-sm text-gray-700 truncate">{fullUrl}</code>
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg" onClick={handleCopy}>
            복사
          </Button>
          <Button size="sm" variant="outline" className="shrink-0 rounded-lg" onClick={handleOpen}>
            열기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
