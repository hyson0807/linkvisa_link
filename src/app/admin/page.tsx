'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CaseTable from './_components/CaseTable';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">서류 수집 관리</h1>
          <p className="text-muted-foreground mt-1">외국인 비자 서류 수집 현황을 확인하세요.</p>
        </div>
        <Link href="/admin/cases/new">
          <Button size="lg" className="h-12 rounded-xl px-6 text-base font-semibold">
            + 새 케이스 만들기
          </Button>
        </Link>
      </div>
      <CaseTable />
    </div>
  );
}
