/**
 * @file layout.tsx
 * @description Main layout - Giữ thiết kế gốc
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Header } from '@/shared/components/layout/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

