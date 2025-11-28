/**
 * @file budget.types.ts
 * @description Types cho quản lý dự toán và chi phí dự án
 * @author Mebisoft Team
 * @created 2025-11-27
 */

/**
 * Enum cho loại chi phí
 */
export enum ExpenseCategory {
  PERSONNEL = 'personnel',       // Nhân sự
  EQUIPMENT = 'equipment',       // Thiết bị
  SOFTWARE = 'software',         // Phần mềm
  OTHER = 'other',              // Chi phí khác
}

/**
 * Label hiển thị cho từng loại chi phí
 */
export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.PERSONNEL]: 'Nhân sự',
  [ExpenseCategory.EQUIPMENT]: 'Thiết bị',
  [ExpenseCategory.SOFTWARE]: 'Phần mềm',
  [ExpenseCategory.OTHER]: 'Chi phí khác',
};

/**
 * Màu sắc cho từng loại chi phí
 */
export const EXPENSE_CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.PERSONNEL]: 'bg-blue-100 text-blue-700',
  [ExpenseCategory.EQUIPMENT]: 'bg-purple-100 text-purple-700',
  [ExpenseCategory.SOFTWARE]: 'bg-green-100 text-green-700',
  [ExpenseCategory.OTHER]: 'bg-gray-100 text-gray-700',
};

/**
 * Interface cho một khoản chi phí
 */
export interface Expense {
  id: string;
  projectId: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  createdBy: string;
  createdAt: string;
}

/**
 * Enum cho trạng thái thanh toán
 */
export enum PaymentStatus {
  PENDING = 'pending',           // Chờ thanh toán
  PAID = 'paid',                // Đã thanh toán
  OVERDUE = 'overdue',          // Quá hạn
  CANCELLED = 'cancelled',       // Đã hủy
}

/**
 * Label cho trạng thái thanh toán
 */
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'Chờ thanh toán',
  [PaymentStatus.PAID]: 'Đã thanh toán',
  [PaymentStatus.OVERDUE]: 'Quá hạn',
  [PaymentStatus.CANCELLED]: 'Đã hủy',
};

/**
 * Màu sắc cho trạng thái thanh toán
 */
export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-700',
  [PaymentStatus.PAID]: 'bg-green-100 text-green-700',
  [PaymentStatus.OVERDUE]: 'bg-red-100 text-red-700',
  [PaymentStatus.CANCELLED]: 'bg-gray-100 text-gray-700',
};

/**
 * Interface cho một đợt thanh toán doanh thu
 */
export interface Revenue {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  invoiceNumber?: string;
  createdAt: string;
}

/**
 * Interface cho dự toán tổng thể của dự án
 */
export interface Budget {
  projectId: string;
  totalBudget: number;           // Tổng dự toán
  totalExpense: number;          // Tổng chi phí thực tế
  totalRevenue: number;          // Tổng doanh thu
  expenseByCategory: {           // Chi phí theo từng loại
    [key in ExpenseCategory]: number;
  };
  warningThreshold: number;      // Ngưỡng cảnh báo (mặc định 80%)
  isOverBudget: boolean;         // Có vượt dự toán không
  remainingBudget: number;       // Dự toán còn lại
  budgetUsagePercent: number;    // Phần trăm sử dụng dự toán
}

/**
 * Interface cho form thêm chi phí
 */
export interface ExpenseFormData {
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
}

/**
 * Interface cho form thêm doanh thu
 */
export interface RevenueFormData {
  description: string;
  amount: number;
  dueDate: string;
  invoiceNumber?: string;
}
