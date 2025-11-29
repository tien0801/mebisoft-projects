/**
 * @file ProjectDetail.tsx
 * @description Comprehensive Project Detail Dashboard Component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { useMemo, useState } from 'react';
import { useProjectStore } from '../store';
import { calculateProjectCompletion } from '../../tasks/utils/task.utils';
import { ProjectHeader } from './detail/ProjectHeader';
import { ProjectStatsCards } from './detail/ProjectStatsCards';
import { ProjectInfoCard } from './detail/ProjectInfoCard';
import { ProjectStatisticsGrid } from './detail/ProjectStatisticsGrid';
import { ProjectMembersSection } from './detail/ProjectMembersSection';
import { ProjectMilestonesSection } from './detail/ProjectMilestonesSection';
import { ProjectActivityLog } from './detail/ProjectActivityLog';
import { ProjectAttachments } from './detail/ProjectAttachments';
import { CreateProjectMemberModal } from './modal/CreateProjectMemberModal';

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const { projects } = useProjectStore();
  const [activeTab] = useState<'gantt' | 'tracker' | 'expense' | 'timesheet' | 'bug' | 'task'>('gantt');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const project = useMemo(() => {
    return projects.find(p => p.id === projectId);
  }, [projects, projectId]);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
      </div>
    );
  }

  const completion = calculateProjectCompletion(project);

  const handleAddMember = (memberData: { name: string; role: string; email: string }) => {
    console.log('Adding member:', memberData);
    // TODO: Implement add member logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader 
        projectId={projectId} 
        projectName={project.name} 
        activeTab={activeTab} 
      />

      <div className="p-6">
        <ProjectStatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ProjectInfoCard project={project} completion={completion} />
          <ProjectStatisticsGrid />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectMembersSection 
            members={project.members} 
            onAddMember={() => setIsAddMemberModalOpen(true)}
          />
          <ProjectMilestonesSection milestoneCount={project.members?.length || 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ProjectActivityLog />
          <ProjectAttachments />
        </div>
      </div>

      <CreateProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMember}
        projectId={projectId}
      />
    </div>
  );
};
