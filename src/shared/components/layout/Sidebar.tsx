/**
 * @file Sidebar.tsx
 * @description Sidebar component với dropdown menu và responsive
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Interface cho menu item
interface MenuItem {
  name: string;
  href?: string;
  icon: string;
  children?: { name: string; href: string }[];
}

// Cấu trúc menu với dropdown
const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: '📊',
    children: [
      { name: 'Projects', href: '/dashboard' },
      { name: 'Overview', href: '/dashboard/overview' },
    ],
  },
  { name: 'Khách Hàng', href: '/customers', icon: '👥' },
  { name: 'Nhân Viên', href: '/employees', icon: '👨‍💼' },
  { name: 'Báo Cáo', href: '/reports', icon: '📈' },
  { name: 'Cài Đặt', href: '/settings', icon: '⚙️' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  // State để quản lý menu nào đang mở
  const [openMenus, setOpenMenus] = useState<string[]>(['Dashboard']);

  // Toggle dropdown menu
  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <>
      {/* Overlay cho mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Mebisoft</h2>
            <p className="text-sm text-gray-500">Project Management</p>
          </div>
          {/* Close button cho mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openMenus.includes(item.name);
              const isActive = item.href ? pathname === item.href : false;

              return (
                <li key={item.name}>
                  {/* Menu item chính */}
                  {hasChildren ? (
                    // Menu có dropdown
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={cn(
                        'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors',
                        'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {/* Arrow icon */}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    // Menu không có dropdown
                    <Link
                      href={item.href!}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Dropdown submenu */}
                  {hasChildren && isOpen && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm',
                                isChildActive
                                  ? 'bg-blue-50 text-blue-600 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              )}
                            >
                              <span className="w-2 h-2 rounded-full bg-current" />
                              <span>{child.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
