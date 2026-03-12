'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCaseStore } from '@/store/case-store';
import { NATIONALITY_OPTIONS, VISA_TYPE_OPTIONS, DocumentPreset } from '@/lib/document-presets';
import { v4 as uuidv4 } from 'uuid';
import DocumentPresetPicker from './DocumentPresetPicker';
import DocumentRequirementForm from './DocumentRequirementForm';

interface DocEntry {
  name: string;
  description: string;
}

export default function CreateCaseForm() {
  const router = useRouter();
  const addCase = useCaseStore((s) => s.addCase);

  const [foreignerName, setForeignerName] = useState('');
  const [nationality, setNationality] = useState('');
  const [visaType, setVisaType] = useState('');
  const [documents, setDocuments] = useState<DocEntry[]>([]);

  const selectedNames = documents.map((d) => d.name);

  const handleTogglePreset = (preset: DocumentPreset) => {
    if (selectedNames.includes(preset.name)) {
      setDocuments((prev) => prev.filter((d) => d.name !== preset.name));
    } else {
      setDocuments((prev) => [...prev, { name: preset.name, description: preset.description }]);
    }
  };

  const handleRemoveDoc = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCustom = (doc: DocEntry) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foreignerName || !nationality || !visaType || documents.length === 0) return;

    const caseId = addCase({
      foreignerName,
      nationality,
      visaType,
      requiredDocuments: documents.map((d) => ({
        id: uuidv4(),
        name: d.name,
        description: d.description,
        uploaded: false,
      })),
    });
    router.push(`/admin/cases/${caseId}`);
  };

  const isValid = foreignerName && nationality && visaType && documents.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-2xl border bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900">기본 정보</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">외국인 이름</Label>
            <Input
              id="name"
              placeholder="예: NGUYEN VAN ANH"
              value={foreignerName}
              onChange={(e) => setForeignerName(e.target.value)}
              className="h-12 rounded-xl text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">국적</Label>
            <Select value={nationality} onValueChange={(v) => v && setNationality(v)}>
              <SelectTrigger className="h-12 rounded-xl text-base">
                <SelectValue placeholder="국적을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {NATIONALITY_OPTIONS.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">비자 유형</Label>
          <Select value={visaType} onValueChange={(v) => v && setVisaType(v)}>
            <SelectTrigger className="h-12 rounded-xl text-base w-full sm:w-80">
              <SelectValue placeholder="비자 유형을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {VISA_TYPE_OPTIONS.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900">필요 서류 설정</h2>
        <DocumentPresetPicker selectedNames={selectedNames} onToggle={handleTogglePreset} />
        <div className="border-t pt-4">
          <DocumentRequirementForm
            documents={documents}
            onRemove={handleRemoveDoc}
            onAddCustom={handleAddCustom}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" size="lg" className="h-12 rounded-xl px-8" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="lg" className="h-12 rounded-xl px-8 text-base font-semibold" disabled={!isValid}>
          케이스 생성
        </Button>
      </div>
    </form>
  );
}
