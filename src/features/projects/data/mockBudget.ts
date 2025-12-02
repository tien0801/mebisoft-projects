/**
 * @file mockBudget.ts
 * @description Mock data cho quản lý dự toán, chi phí và doanh thu
 * @author Mebisoft Team
 * @created 2025-11-27
 */

import {
  Expense,
  Revenue,
  Budget,
  ExpenseCategory,
  PaymentStatus,
} from '../types';

/**
 * Mock data cho chi phí
 */
export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    projectId: '1',
    category: ExpenseCategory.PERSONNEL,
    description: 'Lương tháng 11 cho 3 developers',
    amount: 45000000,
    date: '2024-11-01',
    createdBy: 'Nguyễn Minh Tuấn',
    createdAt: '2024-11-01T08:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    category: ExpenseCategory.SOFTWARE,
    description: 'License Figma Professional',
    amount: 2500000,
    date: '2024-11-05',
    createdBy: 'Phạm Thu Hà',
    createdAt: '2024-11-05T10:30:00Z',
  },
  {
    id: '3',
    projectId: '1',
    category: ExpenseCategory.EQUIPMENT,
    description: 'Mua 2 laptop Dell XPS 15',
    amount: 80000000,
    date: '2024-11-10',
    createdBy: 'Lê Quang Huy',
    createdAt: '2024-11-10T14:20:00Z',
  },
  {
    id: '4',
    projectId: '1',
    category: ExpenseCategory.SOFTWARE,
    description: 'AWS Cloud Services - tháng 11',
    amount: 5000000,
    date: '2024-11-15',
    createdBy: 'Đặng Văn Nam',
    createdAt: '2024-11-15T09:00:00Z',
  },
  {
    id: '5',
    projectId: '1',
    category: ExpenseCategory.OTHER,
    description: 'Chi phí văn phòng và tiện ích',
    amount: 3000000,
    date: '2024-11-20',
    createdBy: 'Võ Thị Mai',
    createdAt: '2024-11-20T11:45:00Z',
  },
  {
    id: '6',
    projectId: '2',
    category: ExpenseCategory.PERSONNEL,
    description: 'Lương tháng 11 cho team',
    amount: 30000000,
    date: '2024-11-01',
    createdBy: 'Trần Hải Yến',
    createdAt: '2024-11-01T08:00:00Z',
  },
];

/**
 * Mock data cho doanh thu
 */
export const MOCK_REVENUES: Revenue[] = [
  {
    id: '1',
    projectId: '1',
    description: 'Thanh toán đợt 1 - Ký hợp đồng',
    amount: 150000000,
    dueDate: '2024-11-01',
    paidDate: '2024-11-01',
    status: PaymentStatus.PAID,
    invoiceNumber: 'INV-2024-001',
    createdAt: '2024-10-25T10:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    description: 'Thanh toán đợt 2 - Hoàn thành Phase 1',
    amount: 100000000,
    dueDate: '2024-12-20',
    paidDate: '2024-12-20',
    status: PaymentStatus.PAID,
    invoiceNumber: 'INV-2024-002',
    createdAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '3',
    projectId: '1',
    description: 'Thanh toán đợt 3 - Hoàn thành Phase 2',
    amount: 150000000,
    dueDate: '2025-03-20',
    status: PaymentStatus.PENDING,
    invoiceNumber: 'INV-2025-001',
    createdAt: '2024-11-20T10:00:00Z',
  },
  {
    id: '4',
    projectId: '1',
    description: 'Thanh toán đợt 4 - Nghiệm thu cuối',
    amount: 100000000,
    dueDate: '2025-06-30',
    status: PaymentStatus.PENDING,
    invoiceNumber: 'INV-2025-002',
    createdAt: '2024-11-20T10:00:00Z',
  },
  {
    id: '5',
    projectId: '2',
    description: 'Thanh toán đợt 1',
    amount: 50000000,
    dueDate: '2024-11-15',
    paidDate: '2024-11-15',
    status: PaymentStatus.PAID,
    invoiceNumber: 'INV-2024-003',
    createdAt: '2024-11-10T10:00:00Z',
  },
];

/**
 * Helper function: Lấy chi phí theo projectId
 */
export const getExpensesByProjectId = (projectId: string): Expense[] => {
  return MOCK_EXPENSES.filter((e) => e.projectId === projectId);
};

/**
 * Helper function: Lấy doanh thu theo projectId
 */
export const getRevenuesByProjectId = (projectId: string): Revenue[] => {
  return MOCK_REVENUES.filter((r) => r.projectId === projectId);
};

/**
 * Helper function: Tính toán budget cho project
 */
export const calculateBudget = (projectId: string, totalBudget: number): Budget => {
  const expenses = getExpensesByProjectId(projectId);
  const revenues = getRevenuesByProjectId(projectId);

  // Tính tổng chi phí
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Tính tổng doanh thu (chỉ tính đã thanh toán)
  const totalRevenue = revenues
    .filter((r) => r.status === PaymentStatus.PAID)
    .reduce((sum, r) => sum + r.amount, 0);

  // Tính chi phí theo từng loại
  const expenseByCategory = {
    [ExpenseCategory.PERSONNEL]: 0,
    [ExpenseCategory.EQUIPMENT]: 0,
    [ExpenseCategory.SOFTWARE]: 0,
    [ExpenseCategory.OTHER]: 0,
  };

  expenses.forEach((expense) => {
    expenseByCategory[expense.category] += expense.amount;
  });

  // Tính các chỉ số
  const remainingBudget = totalBudget - totalExpense;
  const budgetUsagePercent = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0;
  const warningThreshold = 80;
  const isOverBudget = budgetUsagePercent > 100;

  return {
    projectId,
    totalBudget,
    totalExpense,
    totalRevenue,
    expenseByCategory,
    warningThreshold,
    isOverBudget,
    remainingBudget,
    budgetUsagePercent,
  };
};

/**
 * Helper function: Format số tiền VND
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Helper function: Format số tiền ngắn gọn (50M, 1.5B)
 */
export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};
