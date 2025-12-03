/**
 * @file GanttChartView.tsx
 * @description Gantt Chart view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { useMemo, useState } from 'react';

interface GanttChartViewProps {
    projectId: string;
}

type Timeframe = 'quarter' | 'half' | 'day' | 'week' | 'month';

interface GanttTask {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    color: string;
}

const TASK_COLORS = [
    'bg-indigo-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-rose-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-lime-400',
    'bg-green-400',
    'bg-teal-400',
    'bg-cyan-400',
];

const TIMEFRAME_CELL_WIDTH: Record<Timeframe, number> = {
    quarter: 140,
    half: 120,
    day: 90,
    week: 80,
    month: 110
};

// Consistent date formatting function to prevent hydration errors
const formatDateForDisplay = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const GanttChartView = ({ projectId }: GanttChartViewProps) => {
    const { projects } = useProjectStore();
    const [timeframe, setTimeframe] = useState<Timeframe>('month');

    const project = useMemo(() => {
        return projects.find(p => p.id === projectId);
    }, [projects, projectId]);

    const ganttTasks = useMemo(() => {
        if (!project || !project.tasks) return [];

        return project.tasks.map((task, idx) => ({
            id: task.id,
            name: task.name,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            color: TASK_COLORS[idx % TASK_COLORS.length]
        }));
    }, [project]);

    const { timelineStart, timelineEnd } = useMemo(() => {
        if (!project) {
            return { timelineStart: null as Date | null, timelineEnd: null as Date | null };
        }

        if (ganttTasks.length > 0) {
            const startTime = Math.min(...ganttTasks.map(task => task.startDate.getTime()));
            const endTime = Math.max(...ganttTasks.map(task => task.endDate.getTime()));
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            if (endDate.getTime() === startDate.getTime()) {
                endDate.setDate(endDate.getDate() + 1);
            }
            return { timelineStart: startDate, timelineEnd: endDate };
        }

        const projectStart = new Date(project.startDate);
        const projectEnd = new Date(project.endDate);
        if (projectEnd.getTime() === projectStart.getTime()) {
            projectEnd.setDate(projectEnd.getDate() + 1);
        }

        return { timelineStart: projectStart, timelineEnd: projectEnd };
    }, [project, ganttTasks]);

    const { dateRange, topHeaders } = useMemo(() => {
        if (!project || !timelineStart || !timelineEnd) return { dateRange: [], topHeaders: [] };

        const start = new Date(timelineStart);
        const end = new Date(timelineEnd);
        const dates: Array<{ date: Date; topLabel: string; bottomLabel: string }> = [];

        const getMonthName = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
        const getMonthNameFull = (date: Date) => date.toLocaleDateString('en-US', { month: 'long' });

        if (timeframe === 'quarter') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            while (current <= end) {
                const day = current.getDate();
                const monthName = getMonthName(current);
                const topLabel = `${day} ${monthName}`;
                for (let i = 0; i < 4; i++) {
                    const hour = i * 6;
                    const dateWithHour = new Date(current);
                    dateWithHour.setHours(hour);
                    if (dateWithHour < start) continue;
                    if (dateWithHour > end) break;
                    dates.push({
                        date: dateWithHour,
                        topLabel: topLabel,
                        bottomLabel: String(hour).padStart(2, '0'),
                    });
                }
                current.setDate(current.getDate() + 1);
                if (dates.length > 200) break;
            }
        } else if (timeframe === 'half') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            while (current <= end) {
                const day = current.getDate();
                const monthName = getMonthName(current);
                const topLabel = `${day} ${monthName}`;
                for (let i = 0; i < 2; i++) {
                    const hour = i * 12;
                    const dateWithHour = new Date(current);
                    dateWithHour.setHours(hour);
                    if (dateWithHour < start) continue;
                    if (dateWithHour > end) break;
                    dates.push({
                        date: dateWithHour,
                        topLabel: topLabel,
                        bottomLabel: hour === 0 ? '00' : '12',
                    });
                }
                current.setDate(current.getDate() + 1);
                if (dates.length > 100) break;
            }
        } else if (timeframe === 'day') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            while (current <= end) {
                const monthName = getMonthNameFull(current);
                const year = current.getFullYear();
                const topLabel = `${monthName} ${year}`;
                let bottomLabel = String(current.getDate());
                if (current.getDate() === 1) {
                    bottomLabel = `01 ${getMonthName(current)}`;
                }
                dates.push({
                    date: new Date(current),
                    topLabel: topLabel,
                    bottomLabel: bottomLabel,
                });
                current.setDate(current.getDate() + 1);
                if (dates.length > 90) break;
            }
        } else if (timeframe === 'week') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            current.setDate(current.getDate() - current.getDay());
            let prevMonth = -1;
            while (current <= end) {
                if (new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000) < start) {
                    current.setDate(current.getDate() + 7);
                    continue;
                }
                const monthName = getMonthNameFull(current);
                const topLabel = monthName;
                let bottomLabel = String(current.getDate());

                const currentMonth = current.getMonth();
                if (prevMonth !== -1 && currentMonth !== prevMonth) {
                    bottomLabel = `${current.getDate()} ${getMonthName(current)}`;
                }
                prevMonth = currentMonth;

                dates.push({
                    date: new Date(current),
                    topLabel: topLabel,
                    bottomLabel: bottomLabel,
                });
                current.setDate(current.getDate() + 7);
                if (dates.length > 52) break;
            }
        } else if (timeframe === 'month') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            current.setDate(1);
            while (current <= end) {
                const year = current.getFullYear();
                const topLabel = `${year}`;
                dates.push({
                    date: new Date(current),
                    topLabel: topLabel,
                    bottomLabel: getMonthName(current),
                });
                current.setMonth(current.getMonth() + 1);
                if (dates.length > 24) break;
            }
        }

        const topHeaderArray: Array<{ label: string; count: number }> = [];
        if (dates.length > 0) {
            let currentHeader = dates[0].topLabel;
            let count = 0;
            for (const d of dates) {
                if (d.topLabel === currentHeader) {
                    count++;
                } else {
                    if (count > 0) topHeaderArray.push({ label: currentHeader, count: count });
                    currentHeader = d.topLabel;
                    count = 1;
                }
            }
            topHeaderArray.push({ label: currentHeader, count: count });
        }

        return { dateRange: dates, topHeaders: topHeaderArray };
    }, [project, timeframe, timelineStart, timelineEnd]);

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

    const cellWidthPx = TIMEFRAME_CELL_WIDTH[timeframe];
    const timelineWidth = dateRange.length * cellWidthPx;
    const timelineWidthStyle = timelineWidth > 0 ? `${timelineWidth}px` : '100%';

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
