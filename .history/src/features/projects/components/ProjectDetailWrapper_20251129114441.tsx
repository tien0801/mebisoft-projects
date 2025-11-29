/**
 * @file ProjectDetailWrapper.tsx
 * @description Wrapper component for project detail with tab routing
 * @author Mebisoft Team
 * @created 2025-11-29
 */

'use client';

import { usePathname } from 'next/navigation';
import { ProjectDetail } from './ProjectDetail';
import { ProjectBudget } from './ProjectBudget';
import { ProjectHeader } from './project-detail';
import { useProjectStore } from '../store';
import { useMemo } from 'react';

interface ProjectDetailWrapperProps {
  projectId: string;
}

export const ProjectDetailWrapper = ({ projectId }: ProjectDetailWrapperProps) => {
  const pathname = usePathname();
  const { projects } = useProjectStore();

  const project = useMemo(() => {
    return projects.find(p => p.id === projectId);
  }, [projects, projectId]);

  // Determine active tab from pathname
  const activeTab = useMemo(() => {
    if (pathname.includes('/budget')) return 'budget';
    if (pathname.includes('/gantt')) return 'gantt';
    if (pathname.includes('/timesheet')) return 'timesheet';
    if (pathname.includes('/bug')) return 'bug';
    if (pathname.includes('/task')) return 'task';
    return 'overview';
  }, [pathname]);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
      </div>
    );
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <ProjectBudget projectId={projectId} />;
      case 'gantt':
        return <div className="p-6">Gantt Chart - Coming soon</div>;
      case 'timesheet':
        return <div className="p-6">Timesheet - Coming soon</div>;
      case 'bug':
        return <div className="p-6">Bug Report - Coming soon</div>;
      case 'task':
        return <div className="p-6">Task - Coming soon</div>;
      default:
        return <ProjectDetail projectId={projectId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader 
        projectId={projectId} 
        projectName={project.name} 
        activeTab={activeTab} 
      />
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};
