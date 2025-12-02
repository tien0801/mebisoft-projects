/**
 * @file TimesheetHours.tsx
 * @description Component hiển thị giờ làm việc 7 ngày qua
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

/**
 * Component hiển thị timesheet với horizontal bars
 */
export function TimesheetHours() {
  const timesheetData = [
    { name: 'Sun', hours: 8 },
    { name: 'Mon', hours: 9.5 },
    { name: 'Tue', hours: 7 },
    { name: 'Wed', hours: 8.5 },
    { name: 'Thu', hours: 8 },
    { name: 'Fri', hours: 9 },
    { name: 'Sat', hours: 3 },
  ];

  const maxHours = Math.max(...timesheetData.map((d) => d.hours));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Timesheet Logged Hours</h2>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>
      <div className="space-y-3">
        {timesheetData.map((day) => (
          <div key={day.name} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-8">{day.name}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                style={{ width: `${(day.hours / maxHours) * 100}%` }}
              >
                <span className="text-xs font-medium text-white">{day.hours}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
