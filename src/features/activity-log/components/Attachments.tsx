"use client";

import { useState } from "react";
import { Paperclip } from "lucide-react";

import { Attachment } from "@/features/activity-log/types";
import { useProjectStore } from "@/features/activity-log/store";
import {
  AttachmentItem,
  AttachmentUpload,
  ConfirmDeleteModal,
} from "@/features/activity-log/components";

export const Attachments = () => {
  const { attachments, removeAttachment } = useProjectStore();
  const [fileToDelete, setFileToDelete] = useState<Attachment | null>(null);

  const handleDeleteClick = (file: Attachment) => {
    setFileToDelete(file);
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      removeAttachment(fileToDelete.id);
      setFileToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 overflow-hidden h-fit w-full">
        {/* Header */}
        <div className="p-6 flex justify-between items-start border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
              Attachments
            </h2>
          </div>

          <AttachmentUpload />
        </div>

        {/* Attachment list */}
        <div className="p-6 pt-2 h-[400px] overflow-y-auto">
          {attachments.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Paperclip className="text-gray-300" size={24} />
              </div>
              <p className="text-gray-400 font-medium">No attachments yet.</p>
              <p className="text-xs text-gray-300 mt-1">
                Upload files to share with the team.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {attachments.map((file, index) => (
                <AttachmentItem
                  key={file.id}
                  file={file}
                  hasBorder={index !== attachments.length - 1}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!fileToDelete}
        onClose={() => setFileToDelete(null)}
        onConfirm={handleConfirmDelete}
        type="file"
        itemName={fileToDelete?.name || ""}
      />
    </>
  );
};
