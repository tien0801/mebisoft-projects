/**
 * @file mockActivity.ts
 * @description Mock data cho Activity Log, Milestones và Attachments
 * @author Mebisoft Team
 * @created 2025-11-27
 */

import { Activity } from '../types'

// Extended Activity interface for display with icon and detail
export interface ActivityDisplay extends Activity {
  icon: string;
  detail: string;
}

// Mock Activity Log Data
export const MOCK_ACTIVITIES: ActivityDisplay[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Workdo',
    action: 'Workdo Moved the Task',
    detail: 'The marketplace strategy',
    timestamp: '4 years ago',
    type: 'update',
    icon: '✚',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Workdo',
    action: 'Move Task',
    detail: 'Workdo Moved the Task The marketplace strategy from To Do to Done',
    timestamp: '4 years ago',
    type: 'update',
    icon: '⟹',
  },
  {
    id: '3',
    userId: '1',
    userName: 'Workdo',
    action: 'Move Task',
    detail: 'Workdo Moved the Task Website redesign from To Do to Done',
    timestamp: '4 years ago',
    type: 'update',
    icon: '⟹',
  },
  {
    id: '4',
    userId: '1',
    userName: 'Workdo',
    action: 'Create Bug',
    detail: 'Workdo Created new bug Project1 Bug4',
    timestamp: '4 years ago',
    type: 'create',
    icon: '⚠',
  },
  {
    id: '5',
    userId: '1',
    userName: 'Workdo',
    action: 'Create Bug',
    detail: 'Workdo Created new bug Project1 Bug3',
    timestamp: '4 years ago',
    type: 'create',
    icon: '⚠',
  },
  {
    id: '6',
    userId: '1',
    userName: 'Workdo',
    action: 'Create Bug',
    detail: 'Workdo Created new bug Project1 Bug2',
    timestamp: '4 years ago',
    type: 'create',
    icon: '⚠',
  },
];

// Helper function để lấy activities theo projectId
export const getActivitiesByProjectId = (projectId: string): ActivityDisplay[] => {
  // Trong thực tế sẽ filter theo projectId, hiện tại return tất cả
  return MOCK_ACTIVITIES;
};

// Helper function để format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};




