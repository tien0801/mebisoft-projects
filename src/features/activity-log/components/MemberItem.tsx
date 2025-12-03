"use client";

import { Trash2 } from "lucide-react";
import { Member } from "@/features/activity-log/types";
import { Avatar } from "@/features/activity-log/components";

interface MemberItemProps {
  member: Member;
  hasBorder: boolean;
  onDelete: (member: Member) => void;
}

export const MemberItem = ({
  member,
  hasBorder,
  onDelete,
}: MemberItemProps) => {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        hasBorder ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Avatar url={member.avatarImage} />
        <div className="flex flex-col min-w-0">
          <h4 className="font-bold text-gray-800 text-[15px] leading-tight truncate">
            {member.name}
          </h4>
          <p className="text-sm mt-0.5 truncate">{member.email}</p>
        </div>
      </div>

      <div className="hidden sm:block mr-auto ml-4 shrink-0">
        <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
          {member.role}
        </span>
      </div>

      <button
        onClick={() => onDelete(member)}
        className="w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 hover:bg-[#ff4f68] hover:text-white rounded-[10px] transition-all ml-2"
        title="Remove Member"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
