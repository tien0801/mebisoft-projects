'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { useProjectStore } from '../store/projectStore';
import { Project, ProjectTask, ProjectTrackerEntry } from '../types';
import { TimesheetModalState } from '../types/timesheet.types';

const DEFAULT_START_HOUR = 9;

const parseTimeInput = (value: string): number => {
    if (!value || !value.includes(':')) return 0;
    const [hoursStr = '0', minutesStr = '0'] = value.split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;
    return Math.max(hours * 60 + minutes, 0);
};

const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
    const mins = Math.floor(minutes % 60).toString().padStart(2, '0');
    return `${hours}:${mins}`;
};

const getWeekStart = (date: dayjs.Dayjs) => {
    const dayOfWeek = date.day();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    return date.add(diff, 'day').startOf('day');
};

const HOUR_OPTIONS = Array.from({ length: 23 }, (_, index) => index.toString().padStart(2, '0'));
const MINUTE_OPTIONS = Array.from({ length: 13 }, (_, index) => (index * 5).toString().padStart(2, '0'));

interface TimesheetControllerResult {
    project?: Project;
    currentWeekStart: dayjs.Dayjs;
    setCurrentWeekStart: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    weekDays: dayjs.Dayjs[];
    tableTasks: ProjectTask[];
    dailyTotals: number[];
    taskTotals: Map<string, number>;
    totalWeekMinutes: number;
    formatMinutes: (minutes: number) => string;
    getMinutesForTaskDay: (taskId: string, day: dayjs.Dayjs, dayIndex: number) => number;
    openTimeModal: (task: ProjectTask, dayIndex: number) => void;
    closeTimeModal: () => void;
    timeModal: TimesheetModalState | null;
    modalHours: string;
    modalMinutes: string;
    modalDescription: string;
    setModalHours: (value: string) => void;
    setModalMinutes: (value: string) => void;
    setModalDescription: (value: string) => void;
    saveTimesheetEntry: () => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    taskSearch: string;
    setTaskSearch: (value: string) => void;
    filteredTasks: ProjectTask[];
    selectedTask: ProjectTask | null;
    setSelectedTask: (task: ProjectTask | null) => void;
    setVisibleTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
    visibleTaskIds: string[];
    timesheetValues: Record<string, Record<number, string>>;
    setTimesheetValues: React.Dispatch<React.SetStateAction<Record<string, Record<number, string>>>>;
    HOUR_OPTIONS: string[];
    MINUTE_OPTIONS: string[];
}

export const useTimesheetController = (projectId: string): TimesheetControllerResult => {
    const projects = useProjectStore((state) => state.projects);
    const addTrackerEntry = useProjectStore((state) => state.addTrackerEntry);
    const [currentWeekStart, setCurrentWeekStart] = useState(() => getWeekStart(dayjs()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskSearch, setTaskSearch] = useState('');
    const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
    const [visibleTaskIds, setVisibleTaskIds] = useState<string[]>([]);
    const [timesheetValues, setTimesheetValues] = useState<Record<string, Record<number, string>>>({});
    const [timeModal, setTimeModal] = useState<TimesheetModalState | null>(null);
    const [modalHours, setModalHours] = useState('00');
    const [modalMinutes, setModalMinutes] = useState('00');
    const [modalDescription, setModalDescription] = useState('');

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => currentWeekStart.add(index, 'day')), [currentWeekStart]);

    const entriesByTask = useMemo(() => {
        const map = new Map<string, ProjectTrackerEntry[]>();
        project?.trackerEntries?.forEach((entry) => {
            const entryDate = dayjs(entry.date);
            const belongsToWeek = entryDate.isSame(currentWeekStart, 'week');
            if (!belongsToWeek) return;
            const taskKey = entry.taskId ?? entry.taskName;
            if (!map.has(taskKey)) {
                map.set(taskKey, []);
            }
            map.get(taskKey)?.push(entry);
        });
        return map;
    }, [project?.trackerEntries, currentWeekStart]);

    const tasks = useMemo(() => project?.tasks ?? [], [project?.tasks]);

    const defaultTaskIds = useMemo(() => {
        const ids = new Set<string>();
        project?.trackerEntries?.forEach((entry) => {
            const entryDate = dayjs(entry.date);
            if (!entry.taskId) return;
            if (!entryDate.isSame(currentWeekStart, 'week')) return;
            ids.add(entry.taskId);
        });
        return Array.from(ids);
    }, [project?.trackerEntries, currentWeekStart]);

    useEffect(() => {
        if (!defaultTaskIds.length) return;
        setVisibleTaskIds((prev: string[]) => {
            const merged = new Set(prev);
            defaultTaskIds.forEach((id) => merged.add(id));
            return Array.from(merged);
        });
    }, [defaultTaskIds]);

    const effectiveTaskIds = visibleTaskIds.length ? visibleTaskIds : defaultTaskIds;

    const tableTasks = useMemo(() => {
        if (!effectiveTaskIds.length) return [];
        const idSet = new Set(effectiveTaskIds);
        return tasks.filter((task) => idSet.has(task.id));
    }, [tasks, effectiveTaskIds]);

    const availableTasks = useMemo(() => {
        const idSet = new Set(effectiveTaskIds);
        return tasks.filter((task) => !idSet.has(task.id));
    }, [tasks, effectiveTaskIds]);

    const getMinutesForTaskDay = useCallback(
        (taskId: string, day: dayjs.Dayjs, dayIndex: number) => {
            const manualValue = timesheetValues[taskId]?.[dayIndex];
            if (manualValue) return parseTimeInput(manualValue);

            const entries = entriesByTask.get(taskId) ?? [];
            return entries
                .filter((entry) => dayjs(entry.date).isSame(day, 'day'))
                .reduce((total, entry) => {
                    const [sh, sm] = entry.startTime.split(':').map(Number);
                    const [eh, em] = entry.endTime.split(':').map(Number);
                    const start = sh * 60 + sm;
                    const end = eh * 60 + em;
                    return total + Math.max(end - start, 0);
                }, 0);
        },
        [timesheetValues, entriesByTask],
    );

    const taskTotals = useMemo(() => {
        const map = new Map<string, number>();
        tableTasks.forEach((task) => {
            const minutes = weekDays.reduce((sum, day, index) => sum + getMinutesForTaskDay(task.id, day, index), 0);
            map.set(task.id, minutes);
        });
        return map;
    }, [tableTasks, weekDays, getMinutesForTaskDay]);

    const dailyTotals = useMemo(() => weekDays.map((day, index) => tableTasks.reduce((sum, task) => sum + getMinutesForTaskDay(task.id, day, index), 0)), [weekDays, tableTasks, getMinutesForTaskDay]);
    const totalWeekMinutes = useMemo(() => dailyTotals.reduce((sum, value) => sum + value, 0), [dailyTotals]);

    const openTimeModal = (task: ProjectTask, dayIndex: number) => {
        const minutes = getMinutesForTaskDay(task.id, weekDays[dayIndex], dayIndex);
        const hoursPart = Math.min(22, Math.floor(minutes / 60)).toString().padStart(2, '0');
        const minutesPart = Math.min(60, minutes % 60).toString().padStart(2, '0');
        setModalHours(hoursPart);
        setModalMinutes(minutesPart);
        setModalDescription('');
        setTimeModal({ task, dayIndex });
    };

    const closeTimeModal = () => {
        setTimeModal(null);
        setModalHours('00');
        setModalMinutes('00');
        setModalDescription('');
    };

    const saveTimesheetEntry = () => {
        if (!project || !timeModal) return;

        const hours = Math.min(22, Number(modalHours) || 0);
        const minutes = Math.min(60, Number(modalMinutes) || 0);
        const totalMinutes = hours * 60 + minutes;
        const { task, dayIndex } = timeModal;
        const taskId = task.id;
        const day = weekDays[dayIndex];

        const value = formatMinutes(totalMinutes);
        setTimesheetValues((prev) => ({
            ...prev,
            [taskId]: {
                ...prev[taskId],
                [dayIndex]: value,
            },
        }));

        if (totalMinutes > 0) {
            const startTime = dayjs(day).hour(DEFAULT_START_HOUR).minute(0);
            const endTime = startTime.add(totalMinutes, 'minute');
            addTrackerEntry(project.id, {
                id: nanoid(),
                projectId: project.id,
                description: modalDescription || task.name,
                taskId,
                taskName: task.name,
                startTime: startTime.format('HH:mm:ss'),
                endTime: endTime.format('HH:mm:ss'),
                date: day.format('YYYY-MM-DD'),
                source: 'timesheet',
            });
        }

        closeTimeModal();
    };

    const filteredTasks = useMemo(() => {
        if (!taskSearch.trim()) return availableTasks;
        const keyword = taskSearch.toLowerCase();
        return availableTasks.filter((task) => task.name.toLowerCase().includes(keyword));
    }, [taskSearch, availableTasks]);

    const openModal = () => {
        setIsModalOpen(true);
        setTaskSearch('');
        setSelectedTask(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return {
        project,
        currentWeekStart,
        setCurrentWeekStart,
        weekDays,
        tableTasks,
        dailyTotals,
        taskTotals,
        totalWeekMinutes,
        formatMinutes,
        getMinutesForTaskDay,
        openTimeModal,
        closeTimeModal,
        timeModal,
        modalHours,
        modalMinutes,
        modalDescription,
        setModalHours,
        setModalMinutes,
        setModalDescription,
        saveTimesheetEntry,
        isModalOpen,
        openModal,
        closeModal,
        taskSearch,
        setTaskSearch,
        filteredTasks,
        selectedTask,
        setSelectedTask,
        setVisibleTaskIds,
        visibleTaskIds,
        timesheetValues,
        setTimesheetValues,
        HOUR_OPTIONS,
        MINUTE_OPTIONS,
    };
};
