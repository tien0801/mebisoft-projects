import { create } from "zustand";
import { Activity, Member, Attachment } from "@/features/activity-log/types";
import {
  ACTIVITY_LOGS,
  PROJECT_MEMBERS,
  PROJECT_ATTACHMENTS,
} from "@/features/activity-log/data";

interface ProjectStore {
  members: Member[];
  attachments: Attachment[];
  actitivies: Activity[];

  addMember: (member: Omit<Member, "id">) => void;
  removeMember: (id: string) => void;

  addAttachment: (
    file: Omit<Attachment, "id" | "uploadedBy" | "uploadDate">
  ) => void;
  removeAttachment: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  members: PROJECT_MEMBERS,
  attachments: PROJECT_ATTACHMENTS,
  actitivies: ACTIVITY_LOGS,

  addMember: (data) =>
    set((state) => {
      if (state.members.some((m) => m.email === data.email)) return state;

      const newMember: Member = {
        id: crypto.randomUUID(),
        ...data,
      };

      const newActivity: Activity = {
        id: crypto.randomUUID(),
        action: "Invite User",
        user: "You",
        target: data.name,
        time: "Just now",
        type: "add_member",
      };

      return {
        members: [...state.members, newMember],
        actitivies: [newActivity, ...state.actitivies],
      };
    }),

  removeMember: (id) =>
    set((state) => {
      const memberToRemove = state.members.find(
        (m) => m.id.toString() === id.toString()
      );
      if (!memberToRemove) return {};

      const newLog: Activity = {
        id: crypto.randomUUID(),
        action: "Remove User",
        user: "You",
        target: memberToRemove.name,
        time: "Just now",
        type: "remove_member",
      };

      return {
        members: state.members.filter((m) => m.id.toString() !== id.toString()),
        actitivies: [newLog, ...state.actitivies],
      };
    }),

  addAttachment: (data) =>
    set((state) => {
      const newFile: Attachment = {
        id: crypto.randomUUID(),
        uploadedBy: "You",
        uploadDate: "Just now",
        ...data,
      };

      const newActivity: Activity = {
        id: crypto.randomUUID(),
        action: "Uploaded File",
        user: "You",
        target: data.name,
        time: "Just now",
        type: "upload_attachment",
      };

      return {
        attachments: [newFile, ...state.attachments],
        actitivies: [newActivity, ...state.actitivies],
      };
    }),

  removeAttachment: (id) =>
    set((state) => {
      const fileToRemove = state.attachments.find((f) => f.id === id);
      if (!fileToRemove) return {};

      const newLog: Activity = {
        id: crypto.randomUUID(),
        action: "Deleted File",
        user: "You",
        target: fileToRemove.name,
        time: "Just now",
        type: "remove_attachment",
      };

      return {
        attachments: state.attachments.filter((f) => f.id !== id),
        actitivies: [newLog, ...state.actitivies],
      };
    }),
}));
