/**
 * @file TopDueProjects.tsx
 * @description Component hiển thị danh sách dự án sắp đến hạn
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import Link from 'next/link';
import { Project, ProjectStatus, PROJECT_STATUS_LABELS } from '@/features/projects/types/project.types';

interface TopDueProjectsProps {
  projects: Project[];
}

/**
 * Component hiển thị top 3 dự án sắp đến hạn
 */
export function TopDueProjects({ projects }: TopDueProjectsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      [ProjectStatus.PLANNING]: 'bg-purple-500',
      [ProjectStatus.PREPARING]: 'bg-blue-500',
      [ProjectStatus.IN_PROGRESS]: 'bg-cyan-500',
      [ProjectStatus.ON_HOLD]: 'bg-yellow-500',
      [ProjectStatus.COMPLETED]: 'bg-green-500',
      [ProjectStatus.CANCELLED]: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Top Due Projects</h2>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-700">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                  {project.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{project.name}</p>
                  <p className="text-xs text-gray-500">
                    {project.budget ? `$ ${Number(project.budget).toLocaleString()}` : 'No budget'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(project.endDate)}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}
                >
                  {PROJECT_STATUS_LABELS[project.status]}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No projects found</div>
        )}
      </div>
    </div>
  );
}
