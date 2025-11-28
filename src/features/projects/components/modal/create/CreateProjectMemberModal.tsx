/**
 * @file CreateProjectMemberModal.tsx
 * @description Modal thêm thành viên vào project
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { PlusOutlined } from '@ant-design/icons';
import { MOCK_USERS } from '../../../data/mockMember';
import { ProjectMember } from '../../../types/project.types';

interface CreateProjectMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (userId: string) => void;
  currentMembers: ProjectMember[];
}

export function CreateProjectMemberModal({
  isOpen,
  onClose,
  onAddMember,
  currentMembers,
}: CreateProjectMemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Team Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {MOCK_USERS.map((user) => {
              const isAdded = currentMembers.some((m) => m.id === user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onAddMember(user.id);
                      onClose();
                    }}
                    disabled={isAdded}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-2 transition-colors ${
                      isAdded
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isAdded ? '✓' : <PlusOutlined />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
