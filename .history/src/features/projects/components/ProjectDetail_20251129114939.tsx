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
import {
  ProjectHeader,
  ProjectStatsCards,
  ProjectInfoCard,
  ProjectStatisticsGrid,
  ProjectMembersSection,
  ProjectMilestonesSection,
  ProjectActivityLog,
  ProjectAttachments
} from './project-detail';
import { CreateProjectMemberModal } from './modal';
import { ProjectBudget } from './ProjectBudget';

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const { projects } = useProjectStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'gantt' | 'budget' | 'timesheet' | 'bug' | 'task'>('overview');
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

  const handleAddMember = (userId: string) => {
    console.log('Adding member with userId:', userId);
    // TODO: Implement add member logic with store
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'budget':
        return <ProjectBudget projectId={projectId} />;
      
      case 'gantt':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Gantt Chart</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      
      case 'timesheet':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Timesheet</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      
      case 'bug':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Bug Report</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      
      case 'task':
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      
      default: // overview
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader 
        projectId={projectId} 
        projectName={project.name} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="p-6">
        {renderTabContent()}
      </div>

      <CreateProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
        currentMembers={project.members || []}
      />
    </div>
  );
};
