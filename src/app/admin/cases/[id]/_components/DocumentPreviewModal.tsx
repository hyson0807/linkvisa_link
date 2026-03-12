'use client';

import { DocumentRequirement } from '@/types/case';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  doc: DocumentRequirement | null;
  open: boolean;
  onClose: () => void;
}

export default function DocumentPreviewModal({ doc, open, onClose }: Props) {
  if (!doc?.file) return null;

  const isImage = doc.file.type.startsWith('image/');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>{doc.name} - {doc.fileName}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center min-h-[300px] bg-gray-50 rounded-xl overflow-hidden">
          {isImage ? (
            <img src={doc.file.dataUrl} alt={doc.name} className="max-w-full max-h-[60vh] object-contain" />
          ) : (
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📄</div>
              <p className="font-medium text-gray-900">{doc.fileName}</p>
              <p className="text-sm text-muted-foreground mt-1">
                미리보기를 지원하지 않는 파일 형식입니다.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
