/**
 * @file mockMilestone.ts
 * @description Mock data cho Activity Log, Milestones và Attachments
 * @author Mebisoft Team
 * @created 2025-11-27
 */

import { Milestone } from '../types';

// Extended interface for display purposes
export interface MilestoneDisplay extends Milestone {
  tasks: number;
  color: string;
  statusColor: string;
}

// Mock Milestones Data with display properties
export const MOCK_MILESTONES: MilestoneDisplay[] = [
  {
    id: '1',
    title: 'Hiring Individual Positions',
    description: 'Complete hiring process for key positions',
    dueDate: '2024-12-20',
    status: 'completed',
    projectId: '1',
    tasks: 16,
    color: 'bg-green-100',
    statusColor: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Communication Updates',
    description: 'Implement communication system updates',
    dueDate: '2025-03-20',
    status: 'in_progress',
    projectId: '1',
    tasks: 32,
    color: 'bg-blue-100',
    statusColor: 'bg-blue-500',
  },
  {
    id: '3',
    title: 'Design Approval',
    description: 'Get design approval from stakeholders',
    dueDate: '2025-05-15',
    status: 'pending',
    projectId: '1',
    tasks: 0,
    color: 'bg-orange-100',
    statusColor: 'bg-orange-500',
  },
  {
    id: '4',
    title: 'Communication Updates',
    description: 'Additional communication improvements',
    dueDate: '2025-06-30',
    status: 'cancelled',
    projectId: '1',
    tasks: 0,
    color: 'bg-red-100',
    statusColor: 'bg-red-500',
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
