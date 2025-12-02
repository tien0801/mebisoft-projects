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

// Menu items - Tất cả các hệ thống
export const menuItems: MenuItem[] = [
  // Dashboard với submenu
  { name: 'Dashboard', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Accounting', href: '/dashboard/accounting', iconPath: '/images/sidebar/hrm_system.svg', group: 'Dashboard' },
  { name: 'HRM', href: '/dashboard/hrm', iconPath: '/images/sidebar/hrm_system.svg', group: 'Dashboard' },
  { name: 'CRM', href: '/dashboard/crm', iconPath: '/images/sidebar/hrm_system.svg', group: 'Dashboard' },
  { name: 'Project', href: '/dashboard', iconPath: '/images/sidebar/Project_system.svg', group: 'Dashboard' },
  { name: 'POS', href: '/dashboard/pos', iconPath: '/images/sidebar/hrm_system.svg', group: 'Dashboard' },
  
  // HRM System
  { name: 'HRM System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Employees', href: '/hrm/employees', iconPath: '/images/sidebar/hrm_system.svg', group: 'HRM System' },
  { name: 'Attendance', href: '/hrm/attendance', iconPath: '/images/sidebar/hrm_system.svg', group: 'HRM System' },
  { name: 'Payroll', href: '/hrm/payroll', iconPath: '/images/sidebar/hrm_system.svg', group: 'HRM System' },
  
  // Accounting System
  { name: 'Accounting System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Invoices', href: '/accounting/invoices', iconPath: '/images/sidebar/hrm_system.svg', group: 'Accounting System' },
  { name: 'Expenses', href: '/accounting/expenses', iconPath: '/images/sidebar/hrm_system.svg', group: 'Accounting System' },
  { name: 'Reports', href: '/accounting/reports', iconPath: '/images/sidebar/hrm_system.svg', group: 'Accounting System' },
  
  // CRM System
  { name: 'CRM System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Leads', href: '/crm/leads', iconPath: '/images/sidebar/hrm_system.svg', group: 'CRM System' },
  { name: 'Customers', href: '/crm/customers', iconPath: '/images/sidebar/hrm_system.svg', group: 'CRM System' },
  { name: 'Deals', href: '/crm/deals', iconPath: '/images/sidebar/hrm_system.svg', group: 'CRM System' },
  
  // Project System
  { name: 'Project System', href: '#', iconPath: '/images/sidebar/Project_system.svg' },
  { name: 'Projects', href: '/projects', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
  { name: 'Tasks', href: '/taskboard', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
  { name: 'Timesheet', href: '/timesheet', iconPath: '/images/sidebar/Project_system.svg', group: 'Project System' },
  
  // User Management
  { name: 'User Management', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Users', href: '/users', iconPath: '/images/sidebar/hrm_system.svg', group: 'User Management' },
  { name: 'Roles', href: '/users/roles', iconPath: '/images/sidebar/hrm_system.svg', group: 'User Management' },
  { name: 'Permissions', href: '/users/permissions', iconPath: '/images/sidebar/hrm_system.svg', group: 'User Management' },
  
  // Products System
  { name: 'Products System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Products', href: '/products', iconPath: '/images/sidebar/hrm_system.svg', group: 'Products System' },
  { name: 'Categories', href: '/products/categories', iconPath: '/images/sidebar/hrm_system.svg', group: 'Products System' },
  { name: 'Inventory', href: '/products/inventory', iconPath: '/images/sidebar/hrm_system.svg', group: 'Products System' },
  
  // POS System
  { name: 'POS System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Point of Sale', href: '/pos', iconPath: '/images/sidebar/hrm_system.svg', group: 'POS System' },
  { name: 'Orders', href: '/pos/orders', iconPath: '/images/sidebar/hrm_system.svg', group: 'POS System' },
  { name: 'Receipts', href: '/pos/receipts', iconPath: '/images/sidebar/hrm_system.svg', group: 'POS System' },
  
  // Support System
  { name: 'Support System', href: '#', iconPath: '/images/sidebar/hrm_system.svg' },
  { name: 'Tickets', href: '/support/tickets', iconPath: '/images/sidebar/hrm_system.svg', group: 'Support System' },
  { name: 'Knowledge Base', href: '/support/kb', iconPath: '/images/sidebar/hrm_system.svg', group: 'Support System' },
  { name: 'FAQ', href: '/support/faq', iconPath: '/images/sidebar/hrm_system.svg', group: 'Support System' },
  
  // Zoom Meeting
  { name: 'Zoom Meeting', href: '/zoom', iconPath: '/images/sidebar/hrm_system.svg' },
  
  // Messenger
  { name: 'Messenger', href: '/messenger', iconPath: '/images/sidebar/hrm_system.svg' },
  
  // Notification Template
  { name: 'Notification Template', href: '/notifications', iconPath: '/images/sidebar/hrm_system.svg' },
  
  // Settings
  { name: 'Settings', href: '/settings', iconPath: '/images/sidebar/hrm_system.svg' },
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
              const isDropdown = [
                'Dashboard',
                'HRM System',
                'Accounting System',
                'CRM System',
                'Project System',
                'User Management',
                'Products System',
                'POS System',
                'Support System',
              ].includes(item.name);
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
