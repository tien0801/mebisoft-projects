/**
 * @file TasksOverview.tsx
 * @description Component hiển thị biểu đồ area chart tasks overview
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

/**
 * Component biểu đồ area chart hiển thị tasks hoàn thành 7 ngày qua
 */
export function TasksOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Tasks Overview</h2>
        <span className="text-xs text-gray-500">Total Completed tasks in last 7 days</span>
      </div>
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        {/* Chart area */}
        <div className="ml-8 h-full pb-8 relative">
          <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="700" y2="0" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="40" x2="700" y2="40" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="80" x2="700" y2="80" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="120" x2="700" y2="120" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="160" x2="700" y2="160" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="200" x2="700" y2="200" stroke="#e5e7eb" strokeWidth="1" />

            {/* Area fill */}
            <path
              d="M 0 120 L 100 100 L 200 80 L 300 110 L 400 70 L 500 90 L 600 60 L 700 85 L 700 200 L 0 200 Z"
              fill="url(#gradient)"
              opacity="0.3"
            />

            {/* Line */}
            <path
              d="M 0 120 L 100 100 L 200 80 L 300 110 L 400 70 L 500 90 L 600 60 L 700 85"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>14 May</span>
            <span>15 May</span>
            <span>16 May</span>
            <span>17 May</span>
            <span>18 May</span>
            <span>19 May</span>
            <span>20 May</span>
          </div>
        </div>
      </div>
    </div>
  );
}
