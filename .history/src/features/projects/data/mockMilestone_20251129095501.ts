/**
 * @file mockMilestone.ts
 * @description Mock data cho Activity Log, Milestones và Attachments
 * @author Mebisoft Team
 * @created 2025-11-27
 */

import { Milestone } from '../types';

// Mock Milestones Data
export const MOCK_MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'Phase 1: Planning',
    description: 'Complete project planning and requirements gathering',
    dueDate: '2024-12-20',
    status: 'completed',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Phase 2: Development',
    description: 'Build core features and functionality',
    dueDate: '2025-03-20',
    status: 'in_progress',
    projectId: '1',
  },
  {
    id: '3',
    title: 'Phase 3: Testing',
    description: 'Comprehensive testing and bug fixes',
    dueDate: '2025-05-15',
    status: 'pending',
    projectId: '1',
  },
  {
    id: '4',
    title: 'Phase 4: Deployment',
    description: 'Deploy to production and monitor',
    dueDate: '2025-06-30',
    status: 'pending',
    projectId: '1',
  },
  {
    id: '5',
    title: 'UI/UX Design Complete',
    description: 'Finalize all design assets and prototypes',
    dueDate: '2025-01-15',
    status: 'completed',
    projectId: '2',
  },
  {
    id: '6',
    title: 'Backend API Development',
    description: 'Complete REST API endpoints',
    dueDate: '2025-02-28',
    status: 'in_progress',
    projectId: '2',
  },
];


// Helper function để lấy milestones theo projectId
export const getMilestonesByProjectId = (projectId: string): Milestone[] => {
  return MOCK_MILESTONES.filter(m => m.projectId === projectId);
};


// Helper function để get milestone status color
export const getMilestoneStatusColor = (status: Milestone['status']): string => {
  const colorMap: Record<Milestone['status'], string> = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    pending: 'bg-gray-300 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colorMap[status];
};


// Helper function để get milestone status label
export const getMilestoneStatusLabel = (status: Milestone['status']): string => {
  const labelMap: Record<Milestone['status'], string> = {
    completed: 'Completed',
    in_progress: 'In Progress',
    pending: 'Pending',
    cancelled: 'Cancelled',
  };
  return labelMap[status];
};
