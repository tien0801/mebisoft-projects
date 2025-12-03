/**
 * @file ProjectBudget.tsx
 * @description Component quản lý dự toán, chi phí và doanh thu của dự án
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useProjectStore } from '../store';
import { type ExpenseFormData, type RevenueFormData } from '../types';
import { CreateExpenseModal, CreateRevenueModal } from './modal';
import { 
  BudgetOverview, 
  BudgetProgress, 
  BudgetRiskAnalysis,
  ExpenseByCategory, 
  ExpenseTable, 
  RevenueTable 
} from './budget';
import { 
  calculateBudget, 
  getExpensesByProjectId, 
  getRevenuesByProjectId 
} from '../data/mockBudget';

interface ProjectBudgetProps {
  projectId: string;
}

/**
 * Component quản lý dự toán dự án
 * Bao gồm: Dự toán, Chi phí, Doanh thu, Cảnh báo
 */
export function ProjectBudget({ projectId }: ProjectBudgetProps) {
  const { projects } = useProjectStore();
  
  // State cho modals
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);

  // Lấy project và tính toán budget
  const project = useMemo(() => {
    return projects.find((p) => p.id === projectId);
  }, [projects, projectId]);

  const currentBudget = useMemo(() => {
    if (!project?.budget) return null;
    return calculateBudget(projectId, Number(project.budget));
  }, [projectId, project]);

  // Lấy danh sách chi phí và doanh thu
  const expenses = useMemo(() => getExpensesByProjectId(projectId), [projectId]);
  const revenues = useMemo(() => getRevenuesByProjectId(projectId), [projectId]);

  // Tính cảnh báo budget
  const budgetWarning = useMemo(() => {
    if (!currentBudget) return null;
    
    if (currentBudget.isOverBudget) {
      return 'Dự án đã vượt quá ngân sách! Vui lòng xem xét lại chi phí.';
    }
    
    if (currentBudget.budgetUsagePercent >= currentBudget.warningThreshold) {
      return `Cảnh báo: Đã sử dụng ${currentBudget.budgetUsagePercent.toFixed(1)}% ngân sách!`;
    }
    
    return null;
  }, [currentBudget]);

  /**
   * Handle thêm chi phí mới
   */
  const handleAddExpense = (data: ExpenseFormData) => {
    console.log('Adding expense:', data);
    // TODO: Implement add expense logic
    setIsExpenseModalOpen(false);
  };

  /**
   * Handle thêm doanh thu mới
   */
  const handleAddRevenue = (data: RevenueFormData) => {
    console.log('Adding revenue:', data);
    // TODO: Implement add revenue logic
    setIsRevenueModalOpen(false);
  };

  /**
   * Handle xóa chi phí
   */
  const handleDeleteExpense = (id: string) => {
    console.log('Deleting expense:', id);
    // TODO: Implement delete expense logic
  };

  /**
   * Handle xóa doanh thu
   */
  const handleDeleteRevenue = (id: string) => {
    console.log('Deleting revenue:', id);
    // TODO: Implement delete revenue logic
  };

  /**
   * Handle đánh dấu đã thanh toán
   */
  const handleMarkAsPaid = (id: string) => {
    console.log('Marking as paid:', id);
    // TODO: Implement mark as paid logic
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Project not found</div>
      </div>
    );
  }

  if (!currentBudget) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading budget...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cảnh báo dự toán */}
      {budgetWarning && (
        <div className={`flex items-start gap-3 p-4 rounded-lg ${
          currentBudget.isOverBudget 
            ? 'bg-red-50 border border-red-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <AlertTriangle className={`w-5 h-5 mt-0.5 ${
            currentBudget.isOverBudget ? 'text-red-500' : 'text-yellow-500'
          }`} />
          <div className="flex-1">
            <p className={`font-medium ${
              currentBudget.isOverBudget ? 'text-red-900' : 'text-yellow-900'
            }`}>
              {budgetWarning}
            </p>
          </div>
        </div>
      )}

      {/* Tổng quan dự toán */}
      <BudgetOverview budget={currentBudget} />

      {/* Progress bar sử dụng dự toán */}
      <BudgetProgress budget={currentBudget} />

      {/* Phân tích rủi ro */}
      <BudgetRiskAnalysis budget={currentBudget} project={project} />

      {/* Chi phí theo loại */}
      <ExpenseByCategory budget={currentBudget} />

      {/* Bảng chi phí */}
      <ExpenseTable 
        expenses={expenses} 
        onAdd={() => setIsExpenseModalOpen(true)} 
        onDelete={handleDeleteExpense} 
      />

      {/* Bảng doanh thu */}
      <RevenueTable
        revenues={revenues}
        onAdd={() => setIsRevenueModalOpen(true)}
        onDelete={handleDeleteRevenue}
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
