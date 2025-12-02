/**
 * @file ProjectStatsCards.tsx
 * @description Project statistics cards component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { DollarSign } from 'lucide-react';
import { mockProjectStats, formatCurrency } from '../../data';

export const ProjectStatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Task Card */}
      <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Task</p>
            <p className="text-3xl font-bold text-gray-900">{mockProjectStats.totalTasks}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Done Task</p>
            <p className="text-2xl font-bold text-gray-900">{mockProjectStats.doneTasks}</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full -mr-12 -mb-12 opacity-50"></div>
      </div>

      {/* Total Budget Card */}
      <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-sm text-gray-600">Budget</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockProjectStats.totalBudget)}</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 rounded-full -mr-12 -mb-12 opacity-30"></div>
      </div>

      {/* Total Expense Card */}
      <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-sm text-gray-600">Expense</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockProjectStats.totalExpense)}</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-200 rounded-full -mr-12 -mb-12 opacity-30"></div>
      </div>
    </div>
  );
};
