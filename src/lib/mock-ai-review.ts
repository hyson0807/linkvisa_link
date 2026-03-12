import { DocumentRequirement } from '@/types/case';

const APPROVED_COMMENTS = [
  '서류가 요건에 부합합니다.',
  '확인 완료. 이상 없습니다.',
  '규격에 맞는 서류입니다.',
  '유효한 서류로 확인되었습니다.',
];

const REJECTED_COMMENTS = [
  '이미지가 흐릿하여 판독이 어렵습니다. 재촬영 후 업로드해 주세요.',
  '서류의 유효기간이 만료되었습니다. 최신 서류를 제출해 주세요.',
  '필수 정보(이름, 날짜)가 잘려 있습니다. 전체 페이지를 스캔해 주세요.',
  '파일 형식이 올바르지 않습니다. JPG 또는 PDF로 업로드해 주세요.',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function simulateAIReview(
  doc: DocumentRequirement
): { status: 'approved' | 'rejected'; comment: string } {
  if (!doc.uploaded) {
    return { status: 'rejected', comment: '서류가 업로드되지 않았습니다.' };
  }
  const approved = Math.random() < 0.8;
  return {
    status: approved ? 'approved' : 'rejected',
    comment: approved ? pickRandom(APPROVED_COMMENTS) : pickRandom(REJECTED_COMMENTS),
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
