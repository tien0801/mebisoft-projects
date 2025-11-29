/**
 * @file ProjectBudget.tsx
 * @description Component quản lý dự toán, chi phí và doanh thu của dự án
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useProjectStore, useBudgetStore } from '../store';
import { PaymentStatus, type ExpenseFormData, type RevenueFormData } from '../types';
import { CreateExpenseModal, CreateRevenueModal } from './modal';
import { BudgetOverview, BudgetProgress, ExpenseByCategory, ExpenseTable, RevenueTable } from './budget';

interface ProjectBudgetProps {
  projectId: string;
}

/**
 * Component quản lý dự toán dự án
 * Bao gồm: Dự toán, Chi phí, Doanh thu, Cảnh báo
 */
export function ProjectBudget({ projectId }: ProjectBudgetProps) {
  const router = useRouter();
  const { projects, selectedProject } = useProjectStore();

  // Budget store
  const {
    currentBudget,
    loadBudget,
    addExpense,
    deleteExpense,
    getExpensesByProject,
    addRevenue,
    deleteRevenue,
    updateRevenueStatus,
    getRevenuesByProject,
    getBudgetWarning,
  } = useBudgetStore();

  // State cho modals
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);

  // Load budget khi component mount
  useEffect(() => {
    const project = projects.find((p) => p.id === projectId);
    if (project && project.budget) {
      loadBudget(projectId, Number(project.budget));
    }
  }, [projectId, projects, loadBudget]);

  // Lấy danh sách chi phí và doanh thu
  const expenses = getExpensesByProject(projectId);
  const revenues = getRevenuesByProject(projectId);
  const budgetWarning = getBudgetWarning();

  /**
   * Handle thêm chi phí mới
   */
  const handleAddExpense = (data: ExpenseFormData) => {
    addExpense(projectId, data);
  };

  /**
   * Handle thêm doanh thu mới
   */
  const handleAddRevenue = (data: RevenueFormData) => {
    addRevenue(projectId, data);
  };

  /**
   * Handle đánh dấu đã thanh toán
   */
  const handleMarkAsPaid = (id: string) => {
    updateRevenueStatus(id, PaymentStatus.PAID, new Date().toISOString().split('T')[0]);
  };

  if (!currentBudget) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading budget...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <button onClick={() => router.push('/dashboard')} className="hover:text-blue-600">
            Dashboard
          </button>
          <span>/</span>
          <button onClick={() => router.push('/dashboard')} className="hover:text-blue-600">
            Project
          </button>
          <span>/</span>
          <button onClick={() => router.push(`/projects/${projectId}`)} className="hover:text-blue-600">
            {selectedProject?.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Budgeting</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarOutlined className="text-3xl text-green-500" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Quản lý Dự toán</h1>
              <p className="text-sm text-gray-600">{selectedProject?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cảnh báo dự toán */}
      {budgetWarning && (
        <Alert
          title={budgetWarning}
          type={currentBudget.isOverBudget ? 'error' : 'warning'}
          icon={<WarningOutlined />}
          showIcon
          closable
          className="mb-4 md:mb-6"
        />
      )}

      {/* Tổng quan dự toán */}
      <BudgetOverview budget={currentBudget} />

      {/* Progress bar sử dụng dự toán */}
      <BudgetProgress budget={currentBudget} />

      {/* Chi phí theo loại */}
      <ExpenseByCategory budget={currentBudget} />

      {/* Bảng chi phí */}
      <ExpenseTable expenses={expenses} onAdd={() => setIsExpenseModalOpen(true)} onDelete={deleteExpense} />

      {/* Bảng doanh thu */}
      <RevenueTable
        revenues={revenues}
        onAdd={() => setIsRevenueModalOpen(true)}
        onDelete={deleteRevenue}
        onMarkAsPaid={handleMarkAsPaid}
      />

      {/* Modal thêm chi phí */}
      <CreateExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleAddExpense}
      />

      {/* Modal thêm doanh thu */}
      <CreateRevenueModal
        isOpen={isRevenueModalOpen}
        onClose={() => setIsRevenueModalOpen(false)}
        onSubmit={handleAddRevenue}
      />
    </div>
  );
}
