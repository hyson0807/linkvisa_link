'use client';

import CreateCaseForm from './_components/CreateCaseForm';

export default function NewCasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">새 케이스 만들기</h1>
        <p className="text-muted-foreground mt-1">외국인의 정보를 입력하고 필요 서류를 설정하세요.</p>
      </div>
      <CreateCaseForm />
    </div>
  );
}
