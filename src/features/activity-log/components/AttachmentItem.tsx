import { FileText, Trash2 } from "lucide-react";
import { Attachment } from "@/features/activity-log/types";

interface AttachmentItemProps {
  file: Attachment;
  hasBorder: boolean;
  onDelete: (file: Attachment) => void;
}

export const AttachmentItem = ({
  file,
  hasBorder,
  onDelete,
}: AttachmentItemProps) => {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        hasBorder ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <FileText size={20} />
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="font-bold text-gray-800 text-[15px] leading-tight truncate">
            {file.name}
          </h4>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{file.size}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
          {file.type}
        </span>

        <button
          onClick={() => onDelete(file)}
          className="w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 hover:bg-[#ff4f68] hover:text-white rounded-[10px] transition-all ml-2"
          title="Delete File"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
