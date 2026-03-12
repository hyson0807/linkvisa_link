import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Case, DocumentRequirement, FileHandle } from '@/types/case';
import { createSeedCases } from '@/lib/mock-data';
import { simulateAIReview } from '@/lib/mock-ai-review';
import { v4 as uuidv4 } from 'uuid';

interface CaseStore {
  cases: Case[];
  initialized: boolean;
  initializeStore: () => void;
  addCase: (caseData: Omit<Case, 'id' | 'createdAt' | 'uploadLink' | 'status'>) => string;
  getCase: (id: string) => Case | undefined;
  uploadDocument: (caseId: string, docId: string, file: FileHandle) => void;
  runAIReview: (caseId: string) => Promise<void>;
}

export const useCaseStore = create<CaseStore>()(
  persist(
    (set, get) => ({
      cases: [],
      initialized: false,

      initializeStore: () => {
        if (!get().initialized) {
          set({ cases: createSeedCases(), initialized: true });
        }
      },

      addCase: (caseData) => {
        const id = uuidv4();
        const newCase: Case = {
          ...caseData,
          id,
          status: '대기',
          createdAt: new Date().toISOString(),
          uploadLink: `/upload/foreigner?caseId=${id}`,
        };
        set((state) => ({ cases: [newCase, ...state.cases] }));
        return id;
      },

      getCase: (id) => {
        return get().cases.find((c) => c.id === id);
      },

      uploadDocument: (caseId, docId, file) => {
        set((state) => ({
          cases: state.cases.map((c) => {
            if (c.id !== caseId) return c;
            return {
              ...c,
              requiredDocuments: c.requiredDocuments.map((d) => {
                if (d.id !== docId) return d;
                return {
                  ...d,
                  uploaded: true,
                  file,
                  fileName: file.name,
                  uploadedAt: new Date().toISOString(),
                  aiReviewStatus: undefined,
                  aiReviewComment: undefined,
                };
              }),
            };
          }),
        }));
      },

      runAIReview: async (caseId) => {
        set((state) => ({
          cases: state.cases.map((c) =>
            c.id === caseId ? { ...c, status: '검토중' as const } : c
          ),
        }));

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

        set((state) => ({
          cases: state.cases.map((c) => {
            if (c.id !== caseId) return c;
            const reviewed = c.requiredDocuments.map((d): DocumentRequirement => {
              const result = simulateAIReview(d);
              return { ...d, aiReviewStatus: result.status, aiReviewComment: result.comment };
            });
            return { ...c, status: '완료' as const, requiredDocuments: reviewed };
          }),
        }));
      },
    }),
    {
      name: 'linkvisa-case-store',
    }
  )
);
