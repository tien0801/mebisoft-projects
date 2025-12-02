/**
 * @file Header.tsx
 * @description Header component - Giữ thiết kế gốc với CSS
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from './Sidebar';
import { cn } from '@/lib/utils';

import '@/css/header.css';

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(120);
  const [open, setOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileOpenMap, setMobileOpenMap] = useState<Record<string, boolean>>({});
  const toggle = () => setOpen((v) => !v);
  const chevronRight = '/images/sidebar/chevron_down.svg';
  const chevronDown = '/images/header/chevron_up.svg';
  const menuIcon = '/images/header/menu.svg';
  const backIcon = '/images/header/back_arrow.svg';

  const buildBreadcrumbs = (path: string | null) => {
    const crumbs: Array<{ label: string; href: string }> = [];
    if (!path || path === '/dashboard') {
      crumbs.push({ label: '', href: '/dashboard' });
      return crumbs;
    }
    const parts = path.split('/').filter(Boolean);
    crumbs.push({ label: '', href: '/dashboard' });
    let acc = '';
    parts.forEach((part) => {
      if (part === 'dashboard') return;
      acc += `/${part}`;
      const matched = menuItems.find((m) => m.href === acc);
      const label = matched
        ? matched.name
        : part.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      crumbs.push({ label, href: acc });
    });
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs(pathname);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || '';

  const grouped = menuItems.reduce<Record<string, typeof menuItems>>((acc, item) => {
    const key = item.group || '__root__';
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  const rootItems = grouped['__root__'] || [];
  const dashChildren = grouped['Dashboard'] || [];
  const displayedItems: Array<typeof menuItems[0] & { isSyntheticGroup?: boolean }> = [];
  const dashboardItem = rootItems.find((i) => i.name === 'Dashboard');
  const otherRootItems = rootItems.filter((i) => i.name !== 'Dashboard');
  
  if (dashboardItem) displayedItems.push(dashboardItem);
  displayedItems.push(...otherRootItems);

  const avatarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 769) {
        setMobileSidebarOpen(false);
      }
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    const updateHeight = () => {
      const h = node.getBoundingClientRect().height || 120;
      setHeaderHeight(h);
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(node);
    window.addEventListener('resize', updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="app-header px-6 py-4"
      style={{ ['--mobile-header-height' as any]: `${headerHeight}px` }}
    >
      <div className="dash-header header-wrapper">
        <div className="header-left">
          <div className="header-top">
            <button
              type="button"
              className="mobile-sidebar-toggle"
              aria-expanded={mobileSidebarOpen}
              onClick={() => setMobileSidebarOpen((v) => !v)}
            >
              <Image src={mobileSidebarOpen ? backIcon : menuIcon} alt="Toggle menu" width={22} height={22} />
            </button>

            <div className="avatar-card" ref={avatarRef} tabIndex={-1}>
              <button className="avatar-card-btn" onClick={toggle} aria-expanded={open} aria-haspopup="true">
                <span className="avatar-card-img">
                  {user?.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                    : 'U'}
                </span>
                <span className="avatar-card-label"><b>Hi, {user?.name || 'User'}!</b></span>
                <span className="avatar-card-caret">
                  <Image src={open ? chevronDown : chevronRight} alt="toggle" width={18} height={18} />
                </span>
              </button>
              {open && (
                <div className="avatar-dropdown" role="menu">
                  <Link href="/profile" className="dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
                    <Image src="/images/header/profile.svg" alt="Profile" width={18} height={18} />
                    <span className="dropdown-label">Profile</span>
                  </Link>
                  <button className="dropdown-item" role="menuitem" onClick={() => { setOpen(false); logout(); }}>
                    <Image src="/images/header/logout.svg" alt="Logout" width={18} height={18} />
                    <span className="dropdown-label">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* <div className="desktop-meta">
            <div className="dash-title">{pageTitle}</div>
            <div className="dash-breadcrumb">
              {breadcrumbs.map((b, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <span key={b.href || i}>
                    {i !== 0 && <span className="crumb-sep"> › </span>}
                    {isLast ? (
                      <span className="crumb-current">{b.label}</span>
                    ) : (
                      <Link href={b.href} className="crumb-link">
                        {b.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>

      {mobileSidebarOpen && (
        <div className="mobile-sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {mobileSidebarOpen && (
        <aside className="mobile-sidebar-panel">
          <div className="mobile-sidebar-brand">
            <Image src="/images/logo/logo.png" alt="Mebisoft" width={160} height={48} />
          </div>
          <ul className="menuList">
            {displayedItems.map((item, index) => {
              const key = item.name + (item.href || index);
              const isActive = pathname === item.href;
              const isDropdown = item.name === 'Dashboard';
              const children = grouped[item.name] || [];
              const hasActiveChild = children.some((c) => c.href !== '#' && pathname.startsWith(c.href));
              const opened = !!mobileOpenMap[item.name] || hasActiveChild;

              if (isDropdown) {
                const rootChildren = children.filter((c) => !c.parent);

                return (
                  <li key={key}>
                    <div className="dropdown">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenMap((s) => ({ ...s, [item.name]: !s[item.name] }))
                        }
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
                            src={opened ? '/images/sidebar/chevron_down.svg' : '/images/sidebar/chevron_right.svg'}
                            alt={opened ? 'Collapse' : 'Expand'}
                            width={16}
                            height={16}
                            className="chevronIcon"
                          />
                        </span>
                      </button>

                      {opened && rootChildren.length > 0 && (
                        <ul className="menuListNested">
                          {rootChildren.map((c) => {
                            const childActive = pathname === c.href;
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className={cn('menuItem', 'nested', childActive && 'active')}
                                  onClick={() => setMobileSidebarOpen(false)}
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
                <li key={key}>
                  <Link
                    href={item.href}
                    className={cn('menuItem', isActive && 'active')}
                    onClick={() => setMobileSidebarOpen(false)}
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
        </aside>
      )}
    </header>
  );
}
