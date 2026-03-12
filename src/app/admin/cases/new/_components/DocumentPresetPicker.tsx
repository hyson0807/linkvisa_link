'use client';

import { DOCUMENT_PRESETS, DocumentPreset } from '@/lib/document-presets';

interface DocumentPresetPickerProps {
  selectedNames: string[];
  onToggle: (preset: DocumentPreset) => void;
}

export default function DocumentPresetPicker({ selectedNames, onToggle }: DocumentPresetPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">서류 프리셋 (클릭하여 추가/제거)</label>
      <div className="flex flex-wrap gap-2">
        {DOCUMENT_PRESETS.map((preset) => {
          const isSelected = selectedNames.includes(preset.name);
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onToggle(preset)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {isSelected ? '✓ ' : '+ '}
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
