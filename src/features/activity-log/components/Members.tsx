"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  AddMemberModal,
  ConfirmDeleteModal,
  MemberItem,
} from "@/features/activity-log/components";

import { Member } from "@/features/activity-log/types";
import { useProjectStore } from "@/features/activity-log/store";

export const Members = () => {
  const { members, removeMember } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      removeMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 overflow-hidden h-fit w-full">
        {/* Header */}
        <div className="p-6 flex justify-between items-start border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Members
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-9 h-9 bg-blue-600 hover:opacity-90 text-white rounded-[10px] flex items-center justify-center shadow-md transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Member list */}
        <div className="p-6 pt-2 h-[400px] overflow-y-auto">
          {members.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No members found.
            </div>
          ) : (
            <div className="flex flex-col">
              {members.map((member, index) => (
                <MemberItem
                  key={member.id}
                  member={member}
                  hasBorder={index !== members.length - 1}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDeleteModal
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={memberToDelete?.name || ""}
      />
    </>
  );
};
