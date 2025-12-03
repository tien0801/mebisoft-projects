/**
 * @file ProjectMembersSection.tsx
 * @description Project members section component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Plus, Users, X, Crown, Code, Palette, TestTube } from 'lucide-react';
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

const getRoleIcon = (role?: string) => {
  switch (role) {
    case 'PM':
      return <Crown className="w-3 h-3" />;
    case 'Developer':
      return <Code className="w-3 h-3" />;
    case 'Designer':
      return <Palette className="w-3 h-3" />;
    case 'QA':
      return <TestTube className="w-3 h-3" />;
    default:
      return null;
  }
};

const getRoleColor = (role?: string) => {
  switch (role) {
    case 'PM':
      return 'bg-purple-100 text-purple-700';
    case 'Developer':
      return 'bg-blue-100 text-blue-700';
    case 'Designer':
      return 'bg-pink-100 text-pink-700';
    case 'QA':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const ProjectMembersSection = ({ members, onAddMember }: ProjectMembersSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
            <p className="text-xs text-gray-500">{members?.length || 0} members</p>
          </div>
        </div>
        <button 
          onClick={onAddMember}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {members && members.length > 0 ? (
          members.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition group">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: stringToColor(member.name) }}
                >
                  {getInitials(member.name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      {member.role || 'Team Member'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No members assigned</p>
          </div>
        )}
      </div>
    </div>
  );
};
