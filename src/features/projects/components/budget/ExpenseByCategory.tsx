/**
 * @file ExpenseByCategory.tsx
 * @description Component hiển thị chi phí theo từng loại
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { formatCurrency, formatCurrencyShort } from '../../data';
import { ExpenseCategory, EXPENSE_CATEGORY_LABELS } from '../../types';
import type { Budget } from '../../types';

interface ExpenseByCategoryProps {
  budget: Budget;
}

/**
 * Component hiển thị chi phí chia theo 4 loại:
 * - Nhân sự
 * - Thiết bị
 * - Phần mềm
 * - Chi phí khác
 */
export function ExpenseByCategory({ budget }: ExpenseByCategoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi phí theo loại</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(budget.expenseByCategory).map(([category, amount]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">
              {EXPENSE_CATEGORY_LABELS[category as ExpenseCategory]}
            </p>
            <p className="text-lg font-bold text-gray-900">{formatCurrencyShort(amount)}</p>
            <p className="text-xs text-gray-500 mt-1">{formatCurrency(amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
