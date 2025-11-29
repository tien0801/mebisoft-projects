/**
 * @file ProjectHeader.tsx
 * @description Project detail header component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import Link from 'next/link';
import { ChevronLeft, Share2, Edit3 } from 'lucide-react';

interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  activeTab: string;
}

export const ProjectHeader = ({ projectId, projectName, activeTab }: ProjectHeaderProps) => {
  const tabs = [
    { key: 'gantt', label: 'Gantt Chart', color: 'bg-green-500' },
    { key: 'tracker', label: 'Tracker', color: 'bg-blue-500' },
    { key: 'expense', label: 'Expense', color: 'bg-teal-500' },
    { key: 'timesheet', label: 'Timesheet', color: 'bg-blue-600' },
    { key: 'bug', label: 'Bug Report', color: 'bg-green-600' },
    { key: 'task', label: 'Task', color: 'bg-gray-500' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectName}</h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
              <span className="text-gray-400">›</span>
              <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900">{projectName}</span>
            </nav>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              href={`/projects/${projectId}/${tab.key}`}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                activeTab === tab.key
                  ? `${tab.color} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </Link>
          ))}
          <button className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-400 text-white hover:bg-blue-500 transition ml-auto">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
