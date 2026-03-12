'use client';

import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            LV
          </div>
          <span className="text-lg font-bold text-gray-900">LinkVisa Link</span>
        </Link>
        <div className="text-sm text-muted-foreground">관리자</div>
      </div>
    </header>
  );
}
