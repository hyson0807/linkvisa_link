'use client';

import { useEffect, useState } from 'react';
import { useCaseStore } from './case-store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const initializeStore = useCaseStore((s) => s.initializeStore);

  useEffect(() => {
    setHydrated(true);
    initializeStore();
  }, [initializeStore]);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-lg">로딩 중...</div>
      </div>
    );
  }

  return <>{children}</>;
}
