/**
 * @file ProjectSystemMenu.tsx
 * @description Component menu truy cập nhanh các chức năng hệ thống
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import Link from 'next/link';

/**
 * Component menu truy cập nhanh các module của hệ thống
 */
export function ProjectSystemMenu() {
  const menuItems = [
    {
      id: 'projects',
      title: 'Projects',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/projects',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'tasks',
      title: 'Tasks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/tasks',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'timesheet',
      title: 'Timesheet',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/timesheet',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/reports',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium text-gray-900">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
