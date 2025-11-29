/**
 * @file ProjectHeader.tsx
 * @description Project detail header component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import Link from 'next/link';
import { 
  Share2, 
  Edit3, 
  BarChart3, 
  Activity, 
  DollarSign, 
  Clock, 
  Bug, 
  CheckSquare,
  FileText
} from 'lucide-react';

interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  activeTab: string;
}

export const ProjectHeader = ({ projectId, projectName, activeTab }: ProjectHeaderProps) => {
  const tabs = [
    { 
      key: 'overview', 
      label: 'Overview', 
      icon: BarChart3,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600' 
    },
    { 
      key: 'gantt', 
      label: 'Gantt Chart', 
      icon: Activity,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600' 
    },
    { 
      key: 'budget', 
      label: 'Budget', 
      icon: FileText,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600' 
    },
    { 
      key: 'timesheet', 
      label: 'Timesheet', 
      icon: Clock,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700' 
    },
    { 
      key: 'bug', 
      label: 'Bug Report', 
      icon: Bug,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600' 
    },
    { 
      key: 'task', 
      label: 'Task', 
      icon: CheckSquare,
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600' 
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/projects/${projectId}/${tab.key}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                  isActive
                    ? `${tab.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
