import { Case } from '@/types/case';

export interface ForeignerProfile {
  // 인적사항
  nameEn: string;
  nameKo: string;
  birthDate: string;
  gender: string;
  nationality: string;
  phone: string;
  email: string;

  // 여권 정보
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssueCountry: string;

  // 체류 정보
  visaType: string;
  stayPurpose: string;
  entryDate: string;
  stayPeriodStart: string;
  stayPeriodEnd: string;

  // 학력/소속
  institution: string;
  department: string;
  degree: string;
  yearSemester: string;

  // 국내 체류지
  address: string;
  emergencyContact: string;
}

// 간단한 시드 해시: 이름 기반으로 일관된 숫자 생성
function seedHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

const NATIONALITY_DATA: Record<string, { nameKo: string; passportPrefix: string; emailDomain: string }> = {
  '베트남': { nameKo: '응우옌 반 안', passportPrefix: 'B', emailDomain: 'gmail.com' },
  '중국': { nameKo: '왕 샤오밍', passportPrefix: 'E', emailDomain: 'qq.com' },
  '일본': { nameKo: '다나카 유키', passportPrefix: 'TK', emailDomain: 'yahoo.co.jp' },
  '미국': { nameKo: '존 스미스', passportPrefix: 'US', emailDomain: 'gmail.com' },
  '인도네시아': { nameKo: '수리아 위자야', passportPrefix: 'A', emailDomain: 'gmail.com' },
  '몽골': { nameKo: '바트볼드 엥흐', passportPrefix: 'MN', emailDomain: 'gmail.com' },
};

const VISA_PURPOSE: Record<string, { purpose: string; institution: string; department: string; degree: string; yearSemester: string }> = {
  'D-2': { purpose: '대학교 학위과정 수학', institution: '한국대학교', department: '컴퓨터공학과', degree: '학사', yearSemester: '1학년 1학기' },
  'D-4': { purpose: '어학연수 과정 수료', institution: '서울한국어학원', department: '한국어 정규과정', degree: '수료과정', yearSemester: '초급 2단계' },
  'E-7': { purpose: '전문직 취업 활동', institution: '(주)테크코리아', department: '개발팀', degree: '—', yearSemester: '—' },
  'E-9': { purpose: '비전문 취업 활동', institution: '(주)한국제조', department: '생산부', degree: '—', yearSemester: '—' },
  'F-2': { purpose: '거주 자격 체류', institution: '—', department: '—', degree: '—', yearSemester: '—' },
};

const ADDRESSES = [
  '서울시 관악구 관악로 1, 한국대학교 기숙사 302호',
  '서울시 동대문구 회기로 57, 유학생 기숙사 A동 415호',
  '서울시 서대문구 연세로 50, 국제학사 B동 201호',
  '서울시 성북구 안암로 145, 외국인 기숙사 C동 503호',
  '서울시 마포구 와우산로 94, 원룸 3층',
];

const EMERGENCY_CONTACTS = [
  '010-9876-5432 (김미영, 유학생 담당)',
  '010-1234-0000 (박지훈, 외국인 지원센터)',
  '010-5555-1234 (이수진, 학과 조교)',
  '010-7777-8888 (정현우, 고용담당)',
];

export function generateMockProfile(caseData: Case): ForeignerProfile {
  const seed = seedHash(caseData.foreignerName);
  const r = (i: number) => seededRandom(seed, i);

  const natData = NATIONALITY_DATA[caseData.nationality] || {
    nameKo: caseData.foreignerName,
    passportPrefix: 'X',
    emailDomain: 'email.com',
  };

  // 비자유형에서 코드 추출 (예: "D-2 (유학)" → "D-2")
  const visaCode = caseData.visaType.split(' ')[0];
  const visaPurpose = VISA_PURPOSE[visaCode] || VISA_PURPOSE['D-2']!;

  const birthYear = 1995 + Math.floor(r(0) * 8);
  const birthMonth = 1 + Math.floor(r(1) * 12);
  const birthDay = 1 + Math.floor(r(2) * 28);
  const birthDate = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

  const passportNum = `${natData.passportPrefix}${String(10000000 + Math.floor(r(3) * 90000000)).slice(0, 8)}`;
  const phone = `010-${String(1000 + Math.floor(r(4) * 9000))}-${String(1000 + Math.floor(r(5) * 9000))}`;

  const emailName = caseData.foreignerName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '');

  const addressIdx = Math.floor(r(6) * ADDRESSES.length);
  const contactIdx = Math.floor(r(7) * EMERGENCY_CONTACTS.length);

  const gender = r(8) > 0.5 ? '남' : '여';

  return {
    nameEn: caseData.foreignerName,
    nameKo: natData.nameKo,
    birthDate,
    gender,
    nationality: caseData.nationality,
    phone,
    email: `${emailName}@${natData.emailDomain}`,

    passportNumber: passportNum,
    passportIssueDate: '2023-01-10',
    passportExpiryDate: '2033-01-10',
    passportIssueCountry: caseData.nationality,

    visaType: caseData.visaType,
    stayPurpose: visaPurpose.purpose,
    entryDate: '2026-09-01',
    stayPeriodStart: '2026-09-01',
    stayPeriodEnd: '2027-08-31',

    institution: visaPurpose.institution,
    department: visaPurpose.department,
    degree: visaPurpose.degree,
    yearSemester: visaPurpose.yearSemester,

    address: ADDRESSES[addressIdx]!,
    emergencyContact: EMERGENCY_CONTACTS[contactIdx]!,
  };
}
