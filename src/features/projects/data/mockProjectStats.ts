/**
 * @file mockProjectStats.ts
 * @description Mock data for Project Statistics and Stats
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
  icon: 'Calendar' | 'Clock';
  label: string;
  value: string;
  color: string;
  subtext?: boolean;
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

// Helper function to format currency
// export const formatCurrency = (amount: number): string => {
//   return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// };
