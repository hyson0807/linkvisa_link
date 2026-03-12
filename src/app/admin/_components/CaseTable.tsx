'use client';

import { useRouter } from 'next/navigation';
import { useCaseStore } from '@/store/case-store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatusBadge from './StatusBadge';

export default function CaseTable() {
  const router = useRouter();
  const cases = useCaseStore((s) => s.cases);

  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">아직 케이스가 없습니다</h3>
        <p className="text-muted-foreground">새 케이스를 만들어 서류 수집을 시작하세요.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-sm font-semibold text-gray-500 pl-6">외국인 이름</TableHead>
            <TableHead className="text-sm font-semibold text-gray-500">국적</TableHead>
            <TableHead className="text-sm font-semibold text-gray-500">비자 유형</TableHead>
            <TableHead className="text-sm font-semibold text-gray-500">서류 현황</TableHead>
            <TableHead className="text-sm font-semibold text-gray-500">상태</TableHead>
            <TableHead className="text-sm font-semibold text-gray-500 pr-6">생성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((c) => {
            const uploaded = c.requiredDocuments.filter((d) => d.uploaded).length;
            const total = c.requiredDocuments.length;
            return (
              <TableRow
                key={c.id}
                className="cursor-pointer h-14 hover:bg-gray-50"
                onClick={() => router.push(`/admin/cases/${c.id}`)}
              >
                <TableCell className="font-medium pl-6">{c.foreignerName}</TableCell>
                <TableCell>{c.nationality}</TableCell>
                <TableCell>{c.visaType}</TableCell>
                <TableCell>
                  <span className="text-sm">
                    <span className="font-semibold text-primary">{uploaded}</span>
                    <span className="text-muted-foreground">/{total}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={c.status} />
                </TableCell>
                <TableCell className="text-muted-foreground pr-6">
                  {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
