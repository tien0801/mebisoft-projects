"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { Role, User } from "@/features/activity-log/types";
import { USERS } from "@/features/activity-log/data";
import { useProjectStore } from "@/features/activity-log/store";
import { AddMemberItem } from "@/features/activity-log/components";

export const AddMemberModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addMember, members } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState("");

  // State to track the selected role for each user (mapped by email)
  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});

  if (!isOpen) return null;

  // Logic: Filter the user list
  // 1. Exclude users who are already members of the project.
  // 2. Filter based on the search term (matching name or email).
  const filteredUsers = USERS.filter((user) => {
    const isAlreadyMember = members.some((m) => m.email === user.email);
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return !isAlreadyMember && matchesSearch;
  });

  const handleAddUser = (user: User) => {
    const role = selectedRoles[user.email] || "Developer";
    addMember({
      name: user.name,
      email: user.email,
      role: role,
      avatarImage: user.avatarImage,
    });
  };

  const handleRoleChange = (email: string, newRole: string) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [email]: newRole as Role,
    }));
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-[2px] p-4 transition-all">
      <div className="bg-white rounded-xl w-[95%] sm:w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">
            Add Project Members
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto p-2 flex-1">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              {searchTerm
                ? "No users found matching your search."
                : "All available users are already in the project."}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredUsers.map((user) => (
                <AddMemberItem
                  key={user.email}
                  user={user}
                  selectedRole={selectedRoles[user.email] || "Developer"}
                  onRoleChange={(newRole) =>
                    handleRoleChange(user.email, newRole)
                  }
                  onAdd={() => handleAddUser(user)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
          <p className="text-xs text-gray-400">
            Showing available users from organization
          </p>
        </div>
      </div>
    </div>
  );
};
