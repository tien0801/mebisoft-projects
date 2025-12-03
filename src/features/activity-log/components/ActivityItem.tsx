"use client";

import { FilePlus, Plus, UserMinus, UserPlus, FileMinus } from "lucide-react";
import { Activity } from "@/features/activity-log/types";

export const ActivityItem = ({ activity }: { activity: Activity }) => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "add_member":
        return <UserPlus size={20} strokeWidth={2} />;
      case "remove_member":
        return <UserMinus size={20} strokeWidth={2} />;
      case "upload_attachment":
        return <FilePlus size={20} strokeWidth={2} />;
      case "remove_attachment":
        return <FileMinus size={20} strokeWidth={2} />;
      default:
        return <Plus size={20} />;
    }
  };

  const getIconStyle = (type: Activity["type"]) => {
    switch (type) {
      case "remove_member":
      case "remove_attachment":
        return "bg-red-50 text-red-600";
      case "upload_attachment":
        return "bg-purple-50 text-purple-600";
      case "add_member":
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  const renderMessage = () => {
    const Highlight = ({ text }: { text?: string }) => (
      <span className="font-bold text-gray-700">{text}</span>
    );

    switch (activity.type) {
      case "add_member":
        return (
          <span>
            <Highlight text={activity.user} /> has invited{" "}
            <Highlight text={activity.target} />
          </span>
        );
      case "remove_member":
        return (
          <span>
            <Highlight text={activity.user} /> has removed{" "}
            <Highlight text={activity.target} /> from the project
          </span>
        );
      case "upload_attachment":
        return (
          <span>
            <Highlight text={activity.user} /> uploaded file{" "}
            <Highlight text={activity.target} />
          </span>
        );
      case "remove_attachment":
        return (
          <span>
            <Highlight text={activity.user} /> deleted file{" "}
            <Highlight text={activity.target} />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${getIconStyle(
          activity.type
        )}`}
      >
        {getIcon(activity.type)}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-800 text-[15px] truncate pr-2 leading-tight">
            {activity.action}
          </h4>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-auto mt-0.5">
            {activity.time}
          </span>
        </div>

        <div className="text-[13px] text-gray-500 mt-1 leading-relaxed wrap-break-word">
          {renderMessage()}
        </div>
      </div>
    </div>
  );
};
