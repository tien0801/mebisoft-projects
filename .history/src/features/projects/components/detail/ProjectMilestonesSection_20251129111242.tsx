/**
 * @file ProjectMilestonesSection.tsx
 * @description Project milestones section component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Plus } from 'lucide-react';
import { MOCK_MILESTONES } from '../../data';

interface ProjectMilestonesSectionProps {
  milestoneCount: number;
}

export const ProjectMilestonesSection = ({ milestoneCount }: ProjectMilestonesSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Milestones ({milestoneCount})</h3>
        <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_MILESTONES.map((milestone) => (
          <div key={milestone.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{milestone.title}</p>
                <p className="text-xs text-gray-600">{milestone.tasks} Tasks</p>
              </div>
              <span className={`${milestone.statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {milestone.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-orange-100 text-orange-600 rounded hover:bg-orange-200">
                👁
              </button>
              <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                ✎
              </button>
              <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
