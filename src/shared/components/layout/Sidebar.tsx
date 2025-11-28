/**
 * @file Sidebar.tsx
 * @description Sidebar component - Giữ thiết kế gốc, chỉ Dashboard & Projects
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import '@/css/sidebar.css';

type MenuItem = {
  name: string;
  href?: string;
  iconPath: string;
  children?: { name: string; href: string }[];
  group?: string;
};

// Menu items - CHỈ Dashboard và Projects
export const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/dashboard', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Project System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Projects', href: '/projects', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
  { name: 'Tasks', href: '/taskboard', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
  { name: 'Reports', href: '/reportboard', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
];

export function Sidebar() {
  const pathname = usePathname();

  const grouped = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.group || '__root__';
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  const rootItems = grouped['__root__'] || [];
  const dashboardItem = rootItems.find((i) => i.name === 'Dashboard');
  const otherRootItems = rootItems.filter((i) => i.name !== 'Dashboard');
  const displayedItems: Array<MenuItem & { isSyntheticGroup?: boolean }> = [];
  if (dashboardItem) displayedItems.push(dashboardItem);
  displayedItems.push(...otherRootItems);

  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    Object.entries(grouped).forEach(([key, items]) => {
      if (key === '__root__') return;
      const hasActive = items.some((c) => c.href && c.href !== '#' && pathname.startsWith(c.href));
      if (hasActive) {
        map[key] = true;
      }
    });
    return map;
  });
  // Toggle: Click để đóng/mở
  const toggleOpen = (key: string) => setOpenMap((s) => ({ ...s, [key]: !s[key] }));

  const chevronRight = '/images/sidebar/chevron_right.svg';
  const chevronDown = '/images/sidebar/chevron_down.svg';

  return (
    <aside className={cn('sidebar', 'flex flex-col')}>
      {/* Logo */}
      <div className="brand">
        <div className="brandLogo">
          <Image src="/images/logo/logo.png" alt="Mebisoft" width={180} height={64} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="menuWrapper">
        <div className="menuBlock">
          <ul className="menuList">
            {displayedItems.map((item, index) => {
              const key = item.name + (item.href || index);
              const isActive = pathname === item.href;
              const isDropdown = item.name === 'Project System';
              const children = grouped[item.name] || [];
              const hasActiveChild = children.some((c) => c.href && c.href !== '#' && pathname.startsWith(c.href));
              const opened = !!openMap[item.name] || hasActiveChild;

              if (isDropdown) {
                const rootChildren = children;

                return (
                  <li key={key}>
                    <div className="dropdown">
                      {/* Dashboard button - Click để toggle đóng/mở */}
                      <button
                        type="button"
                        onClick={() => toggleOpen(item.name)}
                        className={cn('menuItem', 'dropdownToggle', opened && 'active')}
                      >
                        <div className="dropdownLabel">
                          <span className="icon">
                            <Image src={item.iconPath} alt={item.name} width={36} height={36} />
                          </span>
                          <span className="label">{item.name}</span>
                        </div>

                        <span className="caret">
                          <Image
                            src={opened ? chevronDown : chevronRight}
                            alt={opened ? 'Collapse' : 'Expand'}
                            width={16}
                            height={16}
                            className="chevronIcon"
                          />
                        </span>
                      </button>

                      {/* Submenu - Projects */}
                      {opened && rootChildren.length > 0 && (
                        <ul className="menuListNested">
                          {rootChildren.map((c) => {
                            if (!c.href) return null;

                            const childActive = pathname === c.href;
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className={cn('menuItem', 'nested', childActive && 'active')}
                                >
                                  <span className="label">{c.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href ?? '#'}
                    className={cn('menuItem', isActive && 'active')}
                  >
                    <span className="icon">
                      <Image src={item.iconPath} alt={item.name} width={36} height={36} />
                    </span>
                    <span className="label">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Footer removed - user info moved to header */}
    </aside>
  );
}
