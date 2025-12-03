'use client';

import { useMemo, useState } from 'react';

import { useProjectStore } from '../store/projectStore';
import { DateCell, GanttTask, Timeframe, TimelineHeader } from '../types/project-component.types';
import { Project } from '../types';

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

export const TIMEFRAME_CELL_WIDTH: Record<Timeframe, number> = {
    quarter: 140,
    half: 120,
    day: 90,
    week: 80,
    month: 110,
};

const formatDateForDisplay = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

interface UseGanttChartResult {
    project: Project | undefined;
    timeframe: Timeframe;
    setTimeframe: (value: Timeframe) => void;
    ganttTasks: GanttTask[];
    dateRange: DateCell[];
    topHeaders: TimelineHeader[];
    cellWidthPx: number;
    timelineWidthStyle: string;
    formatDateForDisplay: (date: Date) => string;
}

export const useGanttChartController = (projectId: string): UseGanttChartResult => {
    const { projects } = useProjectStore();
    const [timeframe, setTimeframe] = useState<Timeframe>('month');

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const ganttTasks = useMemo<GanttTask[]>(() => {
        if (!project?.tasks) return [];

        return project.tasks.map((task, idx) => ({
            id: task.id,
            name: task.name,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            color: TASK_COLORS[idx % TASK_COLORS.length],
        }));
    }, [project]);

    const { timelineStart, timelineEnd } = useMemo(() => {
        if (!project) {
            return { timelineStart: null as Date | null, timelineEnd: null as Date | null };
        }

        if (ganttTasks.length > 0) {
            const startTime = Math.min(...ganttTasks.map((task) => task.startDate.getTime()));
            const endTime = Math.max(...ganttTasks.map((task) => task.endDate.getTime()));
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
        if (!project || !timelineStart || !timelineEnd) return { dateRange: [] as DateCell[], topHeaders: [] as TimelineHeader[] };

        const start = new Date(timelineStart);
        const end = new Date(timelineEnd);
        const dates: DateCell[] = [];

        const getMonthName = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
        const getMonthNameFull = (date: Date) => date.toLocaleDateString('en-US', { month: 'long' });

        if (timeframe === 'quarter') {
            let current = new Date(start);
            current.setHours(0, 0, 0, 0);
            while (current <= end) {
                const day = current.getDate();
                const monthName = getMonthName(current);
                const topLabel = `${day} ${monthName}`;
                for (let i = 0; i < 4; i += 1) {
                    const hour = i * 6;
                    const dateWithHour = new Date(current);
                    dateWithHour.setHours(hour);
                    if (dateWithHour < start) continue;
                    if (dateWithHour > end) break;
                    dates.push({
                        date: dateWithHour,
                        topLabel,
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
                for (let i = 0; i < 2; i += 1) {
                    const hour = i * 12;
                    const dateWithHour = new Date(current);
                    dateWithHour.setHours(hour);
                    if (dateWithHour < start) continue;
                    if (dateWithHour > end) break;
                    dates.push({
                        date: dateWithHour,
                        topLabel,
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
                    topLabel,
                    bottomLabel,
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
                    topLabel,
                    bottomLabel,
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
                    topLabel,
                    bottomLabel: getMonthName(current),
                });
                current.setMonth(current.getMonth() + 1);
                if (dates.length > 24) break;
            }
        }

        const topHeaderArray: TimelineHeader[] = [];
        if (dates.length > 0) {
            let currentHeader = dates[0].topLabel;
            let count = 0;
            for (const d of dates) {
                if (d.topLabel === currentHeader) {
                    count += 1;
                } else {
                    if (count > 0) {
                        topHeaderArray.push({ label: currentHeader, count });
                    }
                    currentHeader = d.topLabel;
                    count = 1;
                }
            }
            topHeaderArray.push({ label: currentHeader, count });
        }

        return { dateRange: dates, topHeaders: topHeaderArray };
    }, [project, timeframe, timelineStart, timelineEnd]);

    const cellWidthPx = TIMEFRAME_CELL_WIDTH[timeframe];
    const timelineWidth = dateRange.length * cellWidthPx;
    const timelineWidthStyle = timelineWidth > 0 ? `${timelineWidth}px` : '100%';

    return {
        project,
        timeframe,
        setTimeframe,
        ganttTasks,
        dateRange,
        topHeaders,
        cellWidthPx,
        timelineWidthStyle,
        formatDateForDisplay,
    };
};
