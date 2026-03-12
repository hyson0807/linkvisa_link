'use client';

import { Case } from '@/types/case';
import { ForeignerProfile, generateMockProfile } from '@/lib/mock-foreigner-profile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AISummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 border-b pb-1 mb-3">
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

export default function AISummaryModal({ open, onOpenChange, caseData }: AISummaryModalProps) {
  const profile: ForeignerProfile = generateMockProfile(caseData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI 요약 — 외국인 종합 정보</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* 인적 사항 */}
          <section>
            <SectionTitle>■ 인적 사항</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="성명(영문)" value={profile.nameEn} />
              <Field label="성명(한글)" value={profile.nameKo} />
              <Field label="생년월일" value={profile.birthDate} />
              <Field label="성별" value={profile.gender} />
              <Field label="국적" value={profile.nationality} />
              <Field label="전화번호" value={profile.phone} />
              <Field label="이메일" value={profile.email} />
            </div>
          </section>

          {/* 여권 정보 */}
          <section>
            <SectionTitle>■ 여권 정보</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="여권번호" value={profile.passportNumber} />
              <Field label="발급일" value={profile.passportIssueDate} />
              <Field label="만료일" value={profile.passportExpiryDate} />
              <Field label="발급국" value={profile.passportIssueCountry} />
            </div>
          </section>

          {/* 체류 정보 */}
          <section>
            <SectionTitle>■ 체류 정보</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="비자유형" value={profile.visaType} />
              <Field label="체류목적" value={profile.stayPurpose} />
              <Field label="입국예정일" value={profile.entryDate} />
              <Field label="체류기간" value={`${profile.stayPeriodStart} ~ ${profile.stayPeriodEnd}`} />
            </div>
          </section>

          {/* 학력/소속 정보 */}
          <section>
            <SectionTitle>■ 학력 / 소속 정보</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="소속기관" value={profile.institution} />
              <Field label="학과/전공" value={profile.department} />
              <Field label="학위과정" value={profile.degree} />
              <Field label="학년/학기" value={profile.yearSemester} />
            </div>
          </section>

          {/* 국내 체류지 정보 */}
          <section>
            <SectionTitle>■ 국내 체류지 정보</SectionTitle>
            <div className="grid grid-cols-1 gap-y-3">
              <Field label="주소" value={profile.address} />
              <Field label="긴급연락처" value={profile.emergencyContact} />
            </div>
          </section>

          {/* 제출 서류 현황 */}
          <section>
            <SectionTitle>■ 제출 서류 현황</SectionTitle>
            <div className="space-y-2">
              {caseData.requiredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start gap-2 text-sm">
                  <span className="shrink-0">
                    {doc.aiReviewStatus === 'approved'
                      ? '✅'
                      : doc.aiReviewStatus === 'rejected'
                        ? '❌'
                        : '⬜'}
                  </span>
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-muted-foreground">
                    {doc.aiReviewStatus === 'approved'
                      ? '승인'
                      : doc.aiReviewStatus === 'rejected'
                        ? `반려 — ${doc.aiReviewComment}`
                        : doc.uploaded
                          ? '검토 대기'
                          : '미제출'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
