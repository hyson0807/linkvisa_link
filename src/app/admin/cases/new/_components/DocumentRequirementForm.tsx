'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface DocEntry {
  name: string;
  description: string;
}

interface DocumentRequirementFormProps {
  documents: DocEntry[];
  onRemove: (index: number) => void;
  onAddCustom: (doc: DocEntry) => void;
}

export default function DocumentRequirementForm({ documents, onRemove, onAddCustom }: DocumentRequirementFormProps) {
  const handleAddCustom = () => {
    const name = prompt('서류 이름을 입력하세요');
    if (!name) return;
    const description = prompt('서류 설명/요건을 입력하세요') || '';
    onAddCustom({ name, description });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">필요 서류 목록 ({documents.length}개)</label>
        <Button type="button" variant="outline" size="sm" onClick={handleAddCustom} className="rounded-lg">
          + 커스텀 서류 추가
        </Button>
      </div>
      {documents.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">
          위의 프리셋에서 필요한 서류를 선택하거나, 커스텀 서류를 추가하세요.
        </p>
      ) : (
        <div className="space-y-2">
          {documents.map((doc, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border bg-white p-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{doc.name}</p>
                {doc.description && (
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{doc.description}</p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(i)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
