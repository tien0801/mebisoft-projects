/**
 * @file BudgetOverview.tsx
 * @description Component hiển thị tổng quan dự toán (4 cards)
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { formatCurrency, formatCurrencyShort } from '../../data';
import type { Budget } from '../../types';

interface BudgetOverviewProps {
  budget: Budget;
}

/**
 * Component hiển thị 4 cards tổng quan:
 * - Tổng dự toán
 * - Tổng chi phí
 * - Còn lại
 * - Tổng doanh thu
 */
export function BudgetOverview({ budget }: BudgetOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
      {/* Tổng dự toán */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <p className="text-xs md:text-sm text-gray-600 mb-1">Tổng dự toán</p>
        <p className="text-xl md:text-2xl font-bold text-blue-600">
          {formatCurrencyShort(budget.totalBudget)}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatCurrency(budget.totalBudget)}</p>
      </div>

      {/* Tổng chi phí */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <p className="text-xs md:text-sm text-gray-600 mb-1">Tổng chi phí</p>
        <p className="text-xl md:text-2xl font-bold text-red-600">
          {formatCurrencyShort(budget.totalExpense)}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatCurrency(budget.totalExpense)}</p>
      </div>

      {/* Còn lại */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <p className="text-xs md:text-sm text-gray-600 mb-1">Còn lại</p>
        <p
          className={`text-xl md:text-2xl font-bold ${
            budget.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {formatCurrencyShort(budget.remainingBudget)}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatCurrency(budget.remainingBudget)}</p>
      </div>

      {/* Tổng doanh thu */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <p className="text-xs md:text-sm text-gray-600 mb-1">Tổng doanh thu</p>
        <p className="text-xl md:text-2xl font-bold text-green-600">
          {formatCurrencyShort(budget.totalRevenue)}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatCurrency(budget.totalRevenue)}</p>
      </div>
    </div>
  );
}
