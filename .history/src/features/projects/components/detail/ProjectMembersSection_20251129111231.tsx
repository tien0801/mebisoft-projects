/**
 * @file ProjectMembersSection.tsx
 * @description Project members section component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Plus } from 'lucide-react';
import { ProjectMember } from '../../types';
import { stringToColor } from '../../../tasks/utils/task.utils';

interface ProjectMembersSectionProps {
  members?: ProjectMember[];
  onAddMember: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const ProjectMembersSection = ({ members, onAddMember }: ProjectMembersSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Members</h3>
        <button 
          onClick={onAddMember}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {members && members.length > 0 ? (
          members.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style={{ backgroundColor: stringToColor(member.name) }}
                >
                  {getInitials(member.name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role || 'Team Member'}</p>
                </div>
              </div>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No members assigned</p>
        )}
      </div>
    </div>
  );
};
