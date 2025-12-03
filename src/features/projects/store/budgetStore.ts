/**
 * @file budgetStore.ts
 * @description Zustand store cho quản lý dự toán, chi phí và doanh thu
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { create } from 'zustand';
import {
  Expense,
  Revenue,
  Budget,
  ExpenseFormData,
  RevenueFormData,
  PaymentStatus,
} from '../types/budget.types';
import {
  MOCK_EXPENSES,
  MOCK_REVENUES,
  getExpensesByProjectId,
  getRevenuesByProjectId,
  calculateBudget,
} from '../data/mockBudget';

/**
 * Interface định nghĩa shape của budget store
 */
interface BudgetState {
  // State
  expenses: Expense[];                    // Danh sách chi phí
  revenues: Revenue[];                    // Danh sách doanh thu
  currentBudget: Budget | null;          // Budget hiện tại của project đang xem

  // Actions - Expense
  addExpense: (projectId: string, data: ExpenseFormData) => void;
  updateExpense: (id: string, data: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  getExpensesByProject: (projectId: string) => Expense[];

  // Actions - Revenue
  addRevenue: (projectId: string, data: RevenueFormData) => void;
  updateRevenue: (id: string, data: Partial<Revenue>) => void;
  deleteRevenue: (id: string) => void;
  updateRevenueStatus: (id: string, status: PaymentStatus, paidDate?: string) => void;
  getRevenuesByProject: (projectId: string) => Revenue[];

  // Actions - Budget
  loadBudget: (projectId: string, totalBudget: number) => void;
  updateTotalBudget: (projectId: string, newBudget: number) => void;
  getBudgetWarning: () => string | null;
}

/**
 * Zustand store cho Budget Management
 * Quản lý state toàn cục của dự toán, chi phí và doanh thu
 */
export const useBudgetStore = create<BudgetState>((set, get) => ({
  // Initial state - Load mock data
  expenses: MOCK_EXPENSES,
  revenues: MOCK_REVENUES,
  currentBudget: null,

  // ============ EXPENSE ACTIONS ============

  /**
   * Thêm chi phí mới
   */
  addExpense: (projectId: string, data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      projectId,
      category: data.category,
      description: data.description,
      amount: data.amount,
      date: data.date,
      createdBy: 'Current User', // TODO: Lấy từ auth store
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      expenses: [...state.expenses, newExpense],
    }));

    // Reload budget để cập nhật tính toán
    const { currentBudget } = get();
    if (currentBudget && currentBudget.projectId === projectId) {
      get().loadBudget(projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Cập nhật chi phí
   */
  updateExpense: (id: string, data: Partial<Expense>) => {
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...data } : expense
      ),
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget) {
      get().loadBudget(currentBudget.projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Xóa chi phí
   */
  deleteExpense: (id: string) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget) {
      get().loadBudget(currentBudget.projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Lấy chi phí theo project
   */
  getExpensesByProject: (projectId: string) => {
    return get().expenses.filter((e) => e.projectId === projectId);
  },

  // ============ REVENUE ACTIONS ============

  /**
   * Thêm doanh thu mới
   */
  addRevenue: (projectId: string, data: RevenueFormData) => {
    const newRevenue: Revenue = {
      id: Date.now().toString(),
      projectId,
      description: data.description,
      amount: data.amount,
      dueDate: data.dueDate,
      status: PaymentStatus.PENDING,
      invoiceNumber: data.invoiceNumber,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      revenues: [...state.revenues, newRevenue],
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget && currentBudget.projectId === projectId) {
      get().loadBudget(projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Cập nhật doanh thu
   */
  updateRevenue: (id: string, data: Partial<Revenue>) => {
    set((state) => ({
      revenues: state.revenues.map((revenue) =>
        revenue.id === id ? { ...revenue, ...data } : revenue
      ),
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget) {
      get().loadBudget(currentBudget.projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Xóa doanh thu
   */
  deleteRevenue: (id: string) => {
    set((state) => ({
      revenues: state.revenues.filter((revenue) => revenue.id !== id),
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget) {
      get().loadBudget(currentBudget.projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Cập nhật trạng thái thanh toán
   */
  updateRevenueStatus: (id: string, status: PaymentStatus, paidDate?: string) => {
    set((state) => ({
      revenues: state.revenues.map((revenue) =>
        revenue.id === id
          ? { ...revenue, status, paidDate: paidDate || revenue.paidDate }
          : revenue
      ),
    }));

    // Reload budget
    const { currentBudget } = get();
    if (currentBudget) {
      get().loadBudget(currentBudget.projectId, currentBudget.totalBudget);
    }
  },

  /**
   * Lấy doanh thu theo project
   */
  getRevenuesByProject: (projectId: string) => {
    return get().revenues.filter((r) => r.projectId === projectId);
  },

  // ============ BUDGET ACTIONS ============

  /**
   * Load budget cho project
   */
  loadBudget: (projectId: string, totalBudget: number) => {
    const budget = calculateBudget(projectId, totalBudget);
    set({ currentBudget: budget });
  },

  /**
   * Cập nhật tổng dự toán
   */
  updateTotalBudget: (projectId: string, newBudget: number) => {
    get().loadBudget(projectId, newBudget);
  },

  /**
   * Lấy cảnh báo về dự toán (nếu có)
   */
  getBudgetWarning: () => {
    const { currentBudget } = get();
    if (!currentBudget) return null;

    const { budgetUsagePercent, warningThreshold, isOverBudget } = currentBudget;

    if (isOverBudget) {
      return `⚠️ Cảnh báo: Chi phí đã vượt quá dự toán ${budgetUsagePercent.toFixed(1)}%!`;
    }

    if (budgetUsagePercent >= warningThreshold) {
      return `⚠️ Cảnh báo: Chi phí đã đạt ${budgetUsagePercent.toFixed(1)}% dự toán!`;
    }

    return null;
  },
}));
