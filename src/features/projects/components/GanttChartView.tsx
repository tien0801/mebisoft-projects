/**
 * @file GanttChartView.tsx
 * @description Gantt Chart view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { GanttChartViewProps, GanttTask } from '../types/project-component.types';
import { useGanttChartController, TIMEFRAME_CELL_WIDTH } from '../hooks/useGanttChartController';

export const GanttChartView = ({ projectId }: GanttChartViewProps) => {
    const {
        project,
        timeframe,
        setTimeframe,
        ganttTasks,
        dateRange,
        topHeaders,
        cellWidthPx,
        timelineWidthStyle,
        formatDateForDisplay,
    } = useGanttChartController(projectId);

    const getTaskBarStyle = (task: GanttTask) => {
        if (!project || dateRange.length === 0) return {};

        const viewStart = dateRange[0].date.getTime();

        const firstCell = dateRange[0].date.getTime();
        const secondCell = dateRange.length > 1 ? dateRange[1].date.getTime() : firstCell;
        const cellDuration = secondCell - firstCell > 0 ? secondCell - firstCell : 24 * 60 * 60 * 1000;
        const viewEnd = dateRange[dateRange.length - 1].date.getTime() + cellDuration;

        const viewDuration = viewEnd - viewStart;

        const taskStart = task.startDate.getTime();
        const taskEnd = task.endDate.getTime();

        const clampedTaskStart = Math.max(taskStart, viewStart);
        const clampedTaskEnd = Math.min(taskEnd, viewEnd);

        if (clampedTaskStart >= clampedTaskEnd) {
            return { display: 'none' };
        }

        const startPercent = ((clampedTaskStart - viewStart) / viewDuration) * 100;
        const widthPercent = ((clampedTaskEnd - clampedTaskStart) / viewDuration) * 100;

        return {
            left: `${startPercent}%`,
            width: `${widthPercent}%`,
        };
    };

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Project
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gantt Chart View - {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                    <span className="text-gray-400">›</span>
                    <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
                    <span className="text-gray-400">›</span>
                    <Link href={`/projects/${projectId}`} className="text-green-600 hover:underline">{project.name}</Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900">Gantt Chart</span>
                </nav>

                {/* Timeframe Controls */}
                <div className="flex items-center gap-2 mt-6">
                    {[
                        { key: 'quarter', label: 'Quarter Day' },
                        { key: 'half', label: 'Half Day' },
                        { key: 'day', label: 'Day' },
                        { key: 'week', label: 'Week' },
                        { key: 'month', label: 'Month' }
                    ].map(tf => (
                        <button
                            key={tf.key}
                            onClick={() => setTimeframe(tf.key as any)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${timeframe === tf.key
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {tf.label}
                        </button>
                    ))}
                    <button className="ml-auto p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        ←
                    </button>
                </div>
            </div>

            {/* Gantt Chart */}
            <div className="p-6">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    {/* Top Header - only for quarter/half/day/week/month */}
                    {(timeframe === 'quarter' || timeframe === 'half' || timeframe === 'day' || timeframe === 'week' || timeframe === 'month') && (
                        <div className="flex border-b border-gray-200">
                            <div className="w-48 flex-shrink-0 p-4 border-r border-gray-200 bg-gray-50"></div>
                            <div className="flex" style={{ width: timelineWidthStyle }}>
                                {topHeaders.map((header, idx) => (
                                    <div
                                        key={idx}
                                        className="border-r border-gray-200 text-center py-2 px-2 text-xs font-semibold text-gray-700 bg-gray-50"
                                        style={{ width: `${header.count * cellWidthPx}px` }}
                                    >
                                        {header.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom Header */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 flex-shrink-0 p-4 border-r border-gray-200 bg-gray-50 font-medium text-sm text-gray-700">Task Name</div>
                        <div className="flex" style={{ width: timelineWidthStyle }}>
                            {dateRange.map((date, idx) => (
                                <div
                                    key={idx}
                                    className="border-r border-gray-100 text-center text-xs text-gray-600 p-2 bg-gray-50"
                                    style={{ width: `${cellWidthPx}px` }}
                                >
                                    {date.bottomLabel}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    {ganttTasks.length === 0 ? (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            No tasks available for this project yet.
                        </div>
                    ) : (
                        ganttTasks.map((task) => (
                            <div key={task.id} className="flex border-b border-gray-100 hover:bg-gray-50 transition min-h-16">
                                <div className="w-48 flex-shrink-0 p-4 border-r border-gray-200 text-sm font-medium text-gray-900 truncate">
                                    {task.name}
                                </div>
                                <div className="flex relative" style={{ width: timelineWidthStyle }}>
                                    {/* Grid lines background */}
                                    {dateRange.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="border-r border-gray-100"
                                            style={{ width: `${cellWidthPx}px` }}
                                        />
                                    ))}

                                    {/* Task bar */}
                                    <div
                                        className={`${task.color} rounded-md absolute top-2 h-10 flex items-center px-3 text-white text-sm font-medium whitespace-nowrap shadow-sm hover:shadow-md transition cursor-pointer`}
                                        style={getTaskBarStyle(task)}
                                        title={`${formatDateForDisplay(task.startDate)} - ${formatDateForDisplay(task.endDate)}`}
                                    >
                                        {task.name}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span>Sample tasks shown</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 text-center text-sm text-gray-500">
                © 2025 ERPGo SaaS
            </div>
        </div>
    );
};
