import { Case } from '@/types/case';
import { v4 as uuidv4 } from 'uuid';

function makeUploadLink(caseId: string): string {
  return `/upload/foreigner?caseId=${caseId}`;
}

export function createSeedCases(): Case[] {
  const case1Id = uuidv4();
  const case2Id = uuidv4();
  const case3Id = uuidv4();

  return [
    {
      id: case1Id,
      foreignerName: 'NGUYEN VAN ANH',
      nationality: '베트남',
      visaType: 'D-2 (유학)',
      status: '대기',
      createdAt: '2026-03-10T09:00:00Z',
      uploadLink: makeUploadLink(case1Id),
      requiredDocuments: [
        { id: uuidv4(), name: '증명사진', description: '3.5cm x 4.5cm 규격, 최근 6개월 이내 촬영, 흰색 배경', uploaded: false },
        { id: uuidv4(), name: '여권 사본', description: '유효기간이 남아있는 여권의 인적사항 페이지 스캔', uploaded: false },
        { id: uuidv4(), name: '재학증명서', description: '현재 재학 중인 학교에서 발급한 재학증명서', uploaded: false },
        { id: uuidv4(), name: '성적증명서', description: '최근 학기 성적이 포함된 공식 성적증명서', uploaded: false },
        { id: uuidv4(), name: '재정증명서', description: '은행 잔고증명서 또는 재정보증서 (최근 1개월 이내 발급)', uploaded: false },
        { id: uuidv4(), name: '건강진단서', description: '지정 병원에서 발급한 건강진단서 (최근 3개월 이내)', uploaded: false },
      ],
    },
    {
      id: case2Id,
      foreignerName: 'WANG XIAOMING',
      nationality: '중국',
      visaType: 'E-7 (특정활동)',
      status: '대기',
      createdAt: '2026-03-09T14:30:00Z',
      uploadLink: makeUploadLink(case2Id),
      requiredDocuments: [
        { id: uuidv4(), name: '증명사진', description: '3.5cm x 4.5cm 규격, 최근 6개월 이내 촬영, 흰색 배경', uploaded: true, fileName: 'photo.jpg', uploadedAt: '2026-03-10T10:00:00Z' },
        { id: uuidv4(), name: '여권 사본', description: '유효기간이 남아있는 여권의 인적사항 페이지 스캔', uploaded: true, fileName: 'passport_scan.pdf', uploadedAt: '2026-03-10T10:05:00Z' },
        { id: uuidv4(), name: '졸업증명서', description: '최종 학력 졸업증명서 (공증 필요)', uploaded: false },
        { id: uuidv4(), name: '표준근로계약서', description: '근로계약서 사본 (취업비자 신청 시)', uploaded: false },
        { id: uuidv4(), name: '범죄경력증명서', description: '본국에서 발급한 범죄경력회보서 (아포스티유 필요)', uploaded: false },
      ],
    },
    {
      id: case3Id,
      foreignerName: 'TANAKA YUKI',
      nationality: '일본',
      visaType: 'D-4 (일반연수)',
      status: '완료',
      createdAt: '2026-03-05T11:00:00Z',
      uploadLink: makeUploadLink(case3Id),
      requiredDocuments: [
        { id: uuidv4(), name: '증명사진', description: '3.5cm x 4.5cm 규격, 최근 6개월 이내 촬영, 흰색 배경', uploaded: true, fileName: 'id_photo.jpg', uploadedAt: '2026-03-06T09:00:00Z', aiReviewStatus: 'approved', aiReviewComment: '서류가 요건에 부합합니다.' },
        { id: uuidv4(), name: '여권 사본', description: '유효기간이 남아있는 여권의 인적사항 페이지 스캔', uploaded: true, fileName: 'passport.pdf', uploadedAt: '2026-03-06T09:10:00Z', aiReviewStatus: 'approved', aiReviewComment: '확인 완료. 이상 없습니다.' },
        { id: uuidv4(), name: '재학증명서', description: '현재 재학 중인 학교에서 발급한 재학증명서', uploaded: true, fileName: 'enrollment.pdf', uploadedAt: '2026-03-06T09:20:00Z', aiReviewStatus: 'approved', aiReviewComment: '유효한 서류로 확인되었습니다.' },
        { id: uuidv4(), name: '재정증명서', description: '은행 잔고증명서 또는 재정보증서 (최근 1개월 이내 발급)', uploaded: true, fileName: 'bank_statement.pdf', uploadedAt: '2026-03-06T09:30:00Z', aiReviewStatus: 'rejected', aiReviewComment: '서류의 유효기간이 만료되었습니다. 최신 서류를 제출해 주세요.' },
      ],
    },
  ];
}
