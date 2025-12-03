"use client";

import { useProjectStore } from "@/features/activity-log/store";
import { ActivityItem } from "@/features/activity-log/components";

export const Activities = () => {
  const activities = useProjectStore((state) => state.actitivies);

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 h-fit w-full overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Activity Log
            </h2>
          </div>
        </div>
      </div>

      {/* Activity list */}
      <div className="p-6 pt-2 space-y-4 h-[400px] overflow-y-auto">
        {activities.map((log) => (
          <ActivityItem key={log.id} activity={log} />
        ))}
        {activities.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">
            No activity yet.
          </p>
        )}
      </div>
    </div>
  );
};
