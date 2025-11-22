/**
 * @file page.tsx
 * @description Dashboard page - Hiển thị danh sách Projects
 * @author Mebisoft Team
 * @created 2025-11-22
 */

import { ProjectList } from '@/features/projects';

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-gray-900">Projects</span>
        </div>
      </div>

      {/* Project List */}
      <ProjectList />
    </div>
  );
}

