export interface DocumentPreset {
  name: string;
  description: string;
}

export const DOCUMENT_PRESETS: DocumentPreset[] = [
  { name: '증명사진', description: '3.5cm x 4.5cm 규격, 최근 6개월 이내 촬영, 흰색 배경' },
  { name: '여권 사본', description: '유효기간이 남아있는 여권의 인적사항 페이지 스캔' },
  { name: '재학증명서', description: '현재 재학 중인 학교에서 발급한 재학증명서' },
  { name: '성적증명서', description: '최근 학기 성적이 포함된 공식 성적증명서' },
  { name: '재정증명서', description: '은행 잔고증명서 또는 재정보증서 (최근 1개월 이내 발급)' },
  { name: '건강진단서', description: '지정 병원에서 발급한 건강진단서 (최근 3개월 이내)' },
  { name: '범죄경력증명서', description: '본국에서 발급한 범죄경력회보서 (아포스티유 필요)' },
  { name: '출입국사실증명서', description: '출입국관리사무소에서 발급한 출입국사실증명원' },
  { name: '외국인등록증 사본', description: '외국인등록증 앞뒷면 스캔 (기 등록자에 한함)' },
  { name: '사업자등록증', description: '초청 기관의 사업자등록증 사본' },
  { name: '표준근로계약서', description: '근로계약서 사본 (취업비자 신청 시)' },
  { name: '졸업증명서', description: '최종 학력 졸업증명서 (공증 필요)' },
];

export const NATIONALITY_OPTIONS = [
  '중국', '베트남', '우즈베키스탄', '태국', '몽골',
  '인도네시아', '필리핀', '캄보디아', '미얀마', '네팔',
  '방글라데시', '파키스탄', '스리랑카', '인도', '일본',
  '미국', '러시아', '기타',
];

export const VISA_TYPE_OPTIONS = [
  'D-2 (유학)',
  'D-4 (일반연수)',
  'E-7 (특정활동)',
  'E-9 (비전문취업)',
  'F-2 (거주)',
  'F-4 (재외동포)',
  'F-5 (영주)',
  'F-6 (결혼이민)',
  'H-2 (방문취업)',
  'C-3 (단기방문)',
];
