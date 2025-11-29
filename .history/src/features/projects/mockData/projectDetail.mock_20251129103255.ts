/**
 * @file projectDetail.mock.ts
 * @description Mock data for Project Detail Dashboard
 * @author Mebisoft Team
 * @created 2025-11-29
 */

export interface ProjectStats {
  totalTasks: number;
  doneTasks: number;
  totalBudget: number;
  totalExpense: number;
}

export interface ProjectStatistic {
  icon: string;
  label: string;
  value: string;
  color: string;
  subtext?: boolean;
}

export interface ProjectMilestone {
  name: string;
  tasks: number;
  status: 'Complete' | 'In Progress' | 'On Hold' | 'Canceled';
  color: string;
  statusColor: string;
}

export interface ActivityLog {
  icon: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface Attachment {
  name: string;
  size: string;
}

export const mockProjectStats: ProjectStats = {
  totalTasks: 7,
  doneTasks: 2,
  totalBudget: 2000.00,
  totalExpense: 100.00
};

export const mockProjectStatistics: ProjectStatistic[] = [
  { icon: 'Calendar', label: 'Last 7 days task done', value: '0', color: 'bg-green-100' },
  { icon: 'Clock', label: 'Last 7 days hours spent', value: '8', color: 'bg-green-100' },
  { icon: 'Calendar', label: 'Day Left', value: '1,677/86', color: 'bg-blue-100', subtext: true },
  { icon: 'Calendar', label: 'Open Task', value: '5/7', color: 'bg-blue-100', subtext: true },
  { icon: 'Calendar', label: 'Completed Milestone', value: '1/4', color: 'bg-blue-100', subtext: true },
  { icon: 'Clock', label: 'Total project time spent', value: '81/81', color: 'bg-green-100', subtext: true }
];

export const mockProjectMilestones: ProjectMilestone[] = [
  { 
    name: 'Hiring Individual Positions', 
    tasks: 16, 
    status: 'Complete', 
    color: 'bg-green-100', 
    statusColor: 'bg-green-500' 
  },
  { 
    name: 'Communication Updates', 
    tasks: 32, 
    status: 'In Progress', 
    color: 'bg-blue-100', 
    statusColor: 'bg-blue-500' 
  },
  { 
    name: 'Design Approval', 
    tasks: 0, 
    status: 'On Hold', 
    color: 'bg-orange-100', 
    statusColor: 'bg-orange-500' 
  },
  { 
    name: 'Communication Updates', 
    tasks: 0, 
    status: 'Canceled', 
    color: 'bg-red-100', 
    statusColor: 'bg-red-500' 
  }
];

export const mockActivityLogs: ActivityLog[] = [
  { 
    icon: '✚', 
    action: 'Workdo Moved the Task', 
    detail: 'The marketplace strategy', 
    timestamp: '4 years ago' 
  },
  { 
    icon: '⟹', 
    action: 'Move Task', 
    detail: 'Workdo Moved the Task The marketplace strategy from To Do to Done', 
    timestamp: '4 years ago' 
  },
  { 
    icon: '⟹', 
    action: 'Move Task', 
    detail: 'Workdo Moved the Task Website redesign from To Do to Done', 
    timestamp: '4 years ago' 
  },
  { 
    icon: '⚠', 
    action: 'Create Bug', 
    detail: 'Workdo Created new bug Project1 Bug4', 
    timestamp: '4 years ago' 
  },
  { 
    icon: '⚠', 
    action: 'Create Bug', 
    detail: 'Workdo Created new bug Project1 Bug3', 
    timestamp: '4 years ago' 
  },
  { 
    icon: '⚠', 
    action: 'Create Bug', 
    detail: 'Workdo Created new bug Project1 Bug2', 
    timestamp: '4 years ago' 
  }
];

export const mockAttachments: Attachment[] = [
  { name: '11594448449_download.jpeg', size: '0.01 MB' },
  { name: '11594445989_abstract-best-deals-sale-promotion-banner_44695-313.jpg', size: '0.1 MB' },
  { name: '11594445989_abstract-best-deals-sale-promotion-banner_44695-313.jpg', size: '0.1 MB' },
  { name: '41594448977_download.jpeg', size: '0.01 MB' },
  { name: '41594448981_large.jpg', size: '0.5 MB' }
];

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
