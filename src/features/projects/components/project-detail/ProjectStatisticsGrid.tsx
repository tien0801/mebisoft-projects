/**
 * @file ProjectStatisticsGrid.tsx
 * @description Project statistics grid component
 * @author Mebisoft Team
 * @created 2025-11-29
 */

import { Calendar, Clock } from 'lucide-react';
import { mockProjectStatistics } from '../../data';

export const ProjectStatisticsGrid = () => {
  return (
    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
      {mockProjectStatistics.map((stat, idx) => {
        const IconComponent = stat.icon === 'Calendar' ? Calendar : Clock;
        return (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start gap-3">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <IconComponent className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
