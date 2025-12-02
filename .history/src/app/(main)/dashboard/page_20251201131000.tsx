/**
 * @file page.tsx
 * @description Dashboard page - Trang chào mừng
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useAuth } from '@/features/auth';
import { Card } from '@/shared/components/ui';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Xin chào, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Chào mừng bạn đến với hệ thống quản lý dự án Mebisoft
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng Dự Án</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-2">+12% tháng này</p>
            </div>
            <div className="text-5xl">📊</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đang Triển Khai</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-blue-600 mt-2">33% tổng số</p>
            </div>
            <div className="text-5xl">🚀</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Hoàn Thành</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-green-600 mt-2">50% tổng số</p>
            </div>
            <div className="text-5xl">✅</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Thành Viên</p>
              <p className="text-3xl font-bold text-gray-900">45</p>
              <p className="text-sm text-purple-600 mt-2">15 teams</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Truy Cập Nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/projects"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">📁</div>
            <h3 className="font-semibold text-gray-900 mb-1">Quản Lý Dự Án</h3>
            <p className="text-sm text-gray-600">Xem và quản lý tất cả dự án</p>
          </a>

          <a
            href="/clients"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-1">Khách Hàng</h3>
            <p className="text-sm text-gray-600">Quản lý thông tin khách hàng</p>
          </a>

          <a
            href="/reports"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-900 mb-1">Báo Cáo</h3>
            <p className="text-sm text-gray-600">Xem báo cáo và thống kê</p>
          </a>
        </div>
      </div>
    </div>
  );
}
