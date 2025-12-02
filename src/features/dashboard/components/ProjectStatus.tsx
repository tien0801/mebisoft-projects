/**
 * @file ProjectStatus.tsx
 * @description Component hiển thị trạng thái dự án với progress bars
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

interface ProjectStatusProps {
  inProgressPercent: number;
  onHoldPercent: number;
  completedPercent: number;
  cancelledPercent: number;
}

/**
 * Component hiển thị 4 progress bars cho trạng thái dự án
 */
export function ProjectStatus({
  inProgressPercent,
  onHoldPercent,
  completedPercent,
  cancelledPercent,
}: ProjectStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h2>
      <div className="space-y-4">
        {/* In Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="text-sm font-semibold text-gray-900">{inProgressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${inProgressPercent}%` }}></div>
          </div>
        </div>

        {/* On Hold */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">On Hold</span>
            <span className="text-sm font-semibold text-gray-900">{onHoldPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${onHoldPercent}%` }}></div>
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="text-sm font-semibold text-gray-900">{completedPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completedPercent}%` }}></div>
          </div>
        </div>

        {/* Cancelled */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Cancelled</span>
            <span className="text-sm font-semibold text-gray-900">{cancelledPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${cancelledPercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
