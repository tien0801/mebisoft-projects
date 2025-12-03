/**
 * @file BudgetProgress.tsx
 * @description Component hiển thị progress bar sử dụng dự toán
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { Progress } from 'antd';
import type { Budget } from '../../types';

interface BudgetProgressProps {
  budget: Budget;
}

/**
 * Component hiển thị progress bar với màu sắc động:
 * - Xanh: < 80%
 * - Vàng: >= 80%
 * - Đỏ: > 100%
 */
export function BudgetProgress({ budget }: BudgetProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Sử dụng dự toán</span>
        <span className="text-sm font-semibold text-gray-900">
          {budget.budgetUsagePercent.toFixed(1)}%
        </span>
      </div>
      <Progress
        percent={budget.budgetUsagePercent}
        status={
          budget.isOverBudget
            ? 'exception'
            : budget.budgetUsagePercent >= 80
            ? 'normal'
            : 'success'
        }
        strokeColor={
          budget.isOverBudget
            ? '#ef4444'
            : budget.budgetUsagePercent >= 80
            ? '#f59e0b'
            : '#10b981'
        }
      />
    </div>
  );
}
