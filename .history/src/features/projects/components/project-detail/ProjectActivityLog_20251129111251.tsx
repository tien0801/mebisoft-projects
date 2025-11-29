/**
 * @file ProjectActivityLog.tsx
 * @description Project activity log component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { MOCK_ACTIVITIES } from '../../data';

export const ProjectActivityLog = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Log</h3>
      <p className="text-sm text-gray-600 mb-4">Activity Log of this project</p>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {MOCK_ACTIVITIES.map((log) => (
          <div key={log.id} className="flex gap-3">
            <div className="p-2 bg-green-100 rounded-full text-green-600 font-bold text-sm w-8 h-8 flex items-center justify-center shrink-0">
              {log.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{log.action}</p>
              <p className="text-sm text-gray-600">{log.detail}</p>
              <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
