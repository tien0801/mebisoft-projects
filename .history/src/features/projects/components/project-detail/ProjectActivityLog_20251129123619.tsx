/**
 * @file ProjectActivityLog.tsx
 * @description Project activity log component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Activity } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../../data';

const getActivityColor = (type: string) => {
  switch (type) {
    case 'create':
      return 'bg-blue-100 text-blue-600';
    case 'update':
      return 'bg-green-100 text-green-600';
    case 'delete':
      return 'bg-red-100 text-red-600';
    case 'complete':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const ProjectActivityLog = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6 ">
        <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg overflow-y-auto">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Activity Log</h3>
          <p className="text-xs text-gray-500">Recent project activities</p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto bg-white">

        {MOCK_ACTIVITIES.map((log) => (
          <div key={log.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
            <div className={`p-2 rounded-lg text-lg w-10 h-10 flex items-center justify-center shrink-0 ${getActivityColor(log.type)}`}>
              {log.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{log.action}</p>
              <p className="text-xs text-gray-600 truncate">{log.detail}</p>
              <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
