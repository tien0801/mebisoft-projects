"use client";

import { useRef, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { useProjectStore } from "@/features/activity-log/store";

export const AttachmentUpload = () => {
  const { addAttachment } = useProjectStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection: calculate size, extract extension, and update store
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const sizeInBytes = file.size;
    let sizeString = "";
    if (sizeInBytes < 1024 * 1024) {
      sizeString = `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      sizeString = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  
    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "FILE";

    addAttachment({
      name: file.name,
      size: sizeString,
      type: fileExtension,
    });

    event.target.value = "";
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleUploadClick}
        className="w-9 h-9 bg-purple-600 hover:opacity-90 text-white rounded-[10px] flex items-center justify-center shadow-md transition-all active:scale-95"
        title="Upload File"
      >
        <Upload size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
};
