/**
 * @file BudgetRiskAnalysis.tsx
 * @description Component phân tích và dự đoán rủi ro ngân sách dự án
 * @author Mebisoft Team
 * @created 2025-11-29
 */

'use client';

import { AlertTriangle, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import type { Budget } from '../../types';
import type { Project } from '../../types/project.types';

interface BudgetRiskAnalysisProps {
  budget: Budget;
  project: Project;
}

interface RiskFactor {
  title: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  icon: React.ReactNode;
}

export function BudgetRiskAnalysis({ budget, project }: BudgetRiskAnalysisProps) {
  // Tính toán các chỉ số rủi ro
  const calculateRiskFactors = (): RiskFactor[] => {
    const risks: RiskFactor[] = [];
    
    // 1. Rủi ro vượt ngân sách
    if (budget.isOverBudget) {
      risks.push({
        title: 'Vượt ngân sách',
        level: 'critical',
        description: `Dự án đã vượt ${(budget.budgetUsagePercent - 100).toFixed(1)}% ngân sách. Cần cắt giảm chi phí ngay lập tức.`,
        icon: <DollarSign className="w-5 h-5" />
      });
    } else if (budget.budgetUsagePercent >= 90) {
      risks.push({
        title: 'Gần vượt ngân sách',
        level: 'high',
        description: `Đã sử dụng ${budget.budgetUsagePercent.toFixed(1)}% ngân sách. Chỉ còn ${(100 - budget.budgetUsagePercent).toFixed(1)}% dự trữ.`,
        icon: <DollarSign className="w-5 h-5" />
      });
    } else if (budget.budgetUsagePercent >= 80) {
      risks.push({
        title: 'Cảnh báo ngân sách',
        level: 'medium',
        description: `Đã sử dụng ${budget.budgetUsagePercent.toFixed(1)}% ngân sách. Cần theo dõi chi tiêu chặt chẽ.`,
        icon: <DollarSign className="w-5 h-5" />
      });
    }

    // 2. Rủi ro thời gian
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const today = new Date();
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const timeProgress = (daysElapsed / totalDays) * 100;

    // So sánh tiến độ thời gian vs tiến độ chi tiêu
    const progressGap = budget.budgetUsagePercent - timeProgress;
    
    if (progressGap > 20) {
      risks.push({
        title: 'Chi tiêu nhanh hơn tiến độ',
        level: 'high',
        description: `Chi tiêu ${progressGap.toFixed(1)}% nhanh hơn tiến độ thời gian. Có thể hết ngân sách trước khi hoàn thành.`,
        icon: <TrendingUp className="w-5 h-5" />
      });
    } else if (progressGap > 10) {
      risks.push({
        title: 'Chi tiêu hơi nhanh',
        level: 'medium',
        description: `Chi tiêu ${progressGap.toFixed(1)}% nhanh hơn tiến độ. Cần kiểm soát chi phí tốt hơn.`,
        icon: <TrendingUp className="w-5 h-5" />
      });
    } else if (progressGap < -20) {
      risks.push({
        title: 'Chi tiêu chậm',
        level: 'low',
        description: `Chi tiêu chậm hơn tiến độ ${Math.abs(progressGap).toFixed(1)}%. Có thể cần tăng tốc hoặc có dự trữ tốt.`,
        icon: <TrendingDown className="w-5 h-5" />
      });
    }

    // 3. Rủi ro deadline
    const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) {
      risks.push({
        title: 'Quá deadline',
        level: 'critical',
        description: `Dự án đã quá hạn ${Math.abs(daysRemaining)} ngày. Cần đánh giá lại kế hoạch.`,
        icon: <Clock className="w-5 h-5" />
      });
    } else if (daysRemaining < 30 && budget.budgetUsagePercent < 80) {
      risks.push({
        title: 'Sắp hết hạn - Còn ngân sách',
        level: 'medium',
        description: `Còn ${daysRemaining} ngày và ${(100 - budget.budgetUsagePercent).toFixed(1)}% ngân sách chưa sử dụng.`,
        icon: <Clock className="w-5 h-5" />
      });
    }

    // 4. Phân tích doanh thu
    const revenueVsExpense = (budget.totalRevenue / budget.totalExpense) * 100;
    
    if (budget.totalRevenue < budget.totalExpense) {
      risks.push({
        title: 'Doanh thu thấp hơn chi phí',
        level: 'high',
        description: `Doanh thu chỉ đạt ${revenueVsExpense.toFixed(1)}% chi phí. Cần thu thêm ${((budget.totalExpense - budget.totalRevenue) / 1000000).toFixed(1)}M.`,
        icon: <TrendingDown className="w-5 h-5" />
      });
    }

    // Nếu không có rủi ro
    if (risks.length === 0) {
      risks.push({
        title: 'Dự án ổn định',
        level: 'low',
        description: 'Ngân sách và tiến độ đang trong tầm kiểm soát. Tiếp tục theo dõi.',
        icon: <AlertTriangle className="w-5 h-5" />
      });
    }

    return risks;
  };

  const risks = calculateRiskFactors();

  const getLevelColor = (level: RiskFactor['level']) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'high':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-900';
    }
  };

  const getLevelBadge = (level: RiskFactor['level']) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
    }
  };

  const getLevelText = (level: RiskFactor['level']) => {
    switch (level) {
      case 'critical':
        return 'Nghiêm trọng';
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-900">Phân tích Rủi ro</h3>
      </div>

      <div className="space-y-3">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getLevelColor(risk.level)}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getLevelBadge(risk.level)}`}>
                {risk.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{risk.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelBadge(risk.level)}`}>
                    {getLevelText(risk.level)}
                  </span>
                </div>
                <p className="text-sm">{risk.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Khuyến nghị</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          {budget.isOverBudget && (
            <li>• Xem xét cắt giảm chi phí không cần thiết</li>
          )}
          {budget.budgetUsagePercent >= 80 && (
            <li>• Thiết lập quy trình phê duyệt chi phí chặt chẽ hơn</li>
          )}
          {budget.totalRevenue < budget.totalExpense && (
            <li>• Đàm phán thêm đợt thanh toán với khách hàng</li>
          )}
          <li>• Tổ chức họp review ngân sách định kỳ hàng tuần</li>
          <li>• Cập nhật dự báo chi phí cho các giai đoạn còn lại</li>
        </ul>
      </div>
    </div>
  );
}
