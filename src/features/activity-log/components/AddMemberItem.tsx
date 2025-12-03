"use client";

import { Plus } from "lucide-react";
import { Avatar } from "@/features/activity-log/components";
import { User } from "@/features/activity-log/types";

interface AddMemberItemProps {
  user: User;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onAdd: () => void;
}

export const AddMemberItem = ({
  user,
  selectedRole,
  onRoleChange,
  onAdd,
}: AddMemberItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group gap-3 sm:gap-0">
      <div className="flex items-center gap-3 overflow-hidden min-w-0">
        <Avatar url={user.avatarImage} />
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-gray-800 text-sm truncate">
            {user.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pl-0 sm:pl-2">
        <select
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none cursor-pointer hover:border-gray-300 w-full sm:w-auto"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          {Array.from(["Developer", "QA", "Designer", "Project Manager"]).map(
            (role) => (
              <option key={role} value={role}>
                {role}
              </option>
            )
          )}
        </select>

        <button
          onClick={onAdd}
          className="w-8 h-8 shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all"
          title="Add to Project"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
