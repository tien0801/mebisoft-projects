/**
 * @file Header.tsx
 * @description Header component với hamburger menu và user info
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components/ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        {/* Right: User Info + Logout */}
        <div className="flex items-center gap-4">
          {/* User Avatar & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              M
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">Mebisoft User</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          {/* Logout Button */}
          <Button variant="outline" onClick={logout} className="hidden sm:flex">
            Đăng Xuất
          </Button>
        </div>
      </div>
    </header>
  );
}

