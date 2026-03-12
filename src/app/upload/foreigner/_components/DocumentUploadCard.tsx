'use client';

import { useCallback, useState, useRef } from 'react';
import { DocumentRequirement } from '@/types/case';
import { readFileAsDataUrl, formatFileSize } from '@/lib/file-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  doc: DocumentRequirement;
  onUpload: (docId: string, file: Awaited<ReturnType<typeof readFileAsDataUrl>>) => void;
}

export default function DocumentUploadCard({ doc, onUpload }: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      return;
    }
    const fileHandle = await readFileAsDataUrl(file);
    onUpload(doc.id, fileHandle);
    toast.success(`${doc.name} 업로드 완료`);
  }, [doc.id, doc.name, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const isImage = doc.file?.type.startsWith('image/');

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{doc.name}</h3>
          {doc.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{doc.description}</p>
          )}
        </div>

        {doc.uploaded && doc.file ? (
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              {isImage ? (
                <img src={doc.file.dataUrl} alt={doc.name} className="h-16 w-16 rounded-lg object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-3xl">📄</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(doc.file.size)}</p>
              </div>
              <svg className="h-6 w-6 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full rounded-lg"
              onClick={handleClick}
            >
              다시 업로드
            </Button>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
              dragging
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
            }`}
          >
            <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-medium text-gray-600">여기로 파일을 끌어놓으세요</p>
            <p className="text-xs text-muted-foreground mt-1">또는 클릭하여 파일 선택</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  );
}
