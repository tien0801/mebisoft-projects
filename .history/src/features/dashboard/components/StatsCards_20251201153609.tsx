/**
 * @file StatsCards.tsx
 * @description Component hiển thị 3 cards thống kê tổng quan
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

interface StatsCardsProps {
  totalProjects: number;
  completedPercent: number;
  totalTasks: number;
  completedTasksPercent: number;
  totalExpense: number;
  expensePercent: number;
}

/**
 * Component 3 cards thống kê:
 * - Total Projects
 * - Total Tasks
 * - Total Expense
 */
export function StatsCards({
  totalProjects,
  completedPercent,
  totalTasks,
  completedTasksPercent,
  totalExpense,
  expensePercent,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:w-1/2 lg:w-1/3 mb-6">
      {/* Total Projects */}
      <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
          </div>
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-pink-600">{completedPercent}%</span>
          <span className="text-sm text-gray-500">Completed</span>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
          <svg viewBox="0 0 100 50" className="w-full h-full text-pink-500">
            <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Total Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-green-600">{completedTasksPercent}%</span>
          <span className="text-sm text-gray-500">Completed</span>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
          <svg viewBox="0 0 100 50" className="w-full h-full text-green-500">
            <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Total Expense */}
      <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Expense</p>
            <p className="text-3xl font-bold text-gray-900">{totalExpense}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-orange-600">{expensePercent}%</span>
          <span className="text-sm text-gray-500">Completed</span>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
          <svg viewBox="0 0 100 50" className="w-full h-full text-orange-500">
            <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
