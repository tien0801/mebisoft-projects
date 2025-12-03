/**
 * @file ProjectMilestonesSection.tsx
 * @description Project milestones section component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Plus, Flag, Eye, Edit2, Trash2, CheckCircle, Clock, Pause, XCircle } from 'lucide-react';
import { MOCK_MILESTONES } from '../../data';

interface ProjectMilestonesSectionProps {
  milestoneCount: number;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'in_progress':
      return <Clock className="w-4 h-4" />;
    case 'pending':
      return <Pause className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Flag className="w-4 h-4" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Complete';
    case 'in_progress':
      return 'In Progress';
    case 'pending':
      return 'On Hold';
    case 'cancelled':
      return 'Canceled';
    default:
      return status;
  }
};

export const ProjectMilestonesSection = ({ milestoneCount }: ProjectMilestonesSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Milestones</h3>
            <p className="text-xs text-gray-500">{MOCK_MILESTONES.length} milestones</p>
          </div>
        </div>
        <button className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {MOCK_MILESTONES.map((milestone) => (
          <div key={milestone.id} className="p-3 hover:bg-gray-50 rounded-lg transition group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm mb-1">{milestone.title}</p>
                <p className="text-xs text-gray-500">{milestone.tasks} Tasks</p>
              </div>
              <span className={`${milestone.statusColor} text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1`}>
                {getStatusIcon(milestone.status)}
                {getStatusLabel(milestone.status)}
              </span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                <Eye className="w-3 h-3" />
                View
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition">
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
