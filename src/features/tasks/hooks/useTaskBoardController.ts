'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useProjectStore } from '../../projects/store/projectStore';
import { Project, ProjectStatus } from '../../projects/types/project.types';
import { useTasks } from './useTasks';
import { Task } from '../types/task.types';
import { BoardColumnConfig, BoardColumnData, BoardColumnKey } from '../types/task-component.types';

const COLUMN_CONFIG: Record<BoardColumnKey, BoardColumnConfig> = {
    review: {
        title: 'Review',
        status: ProjectStatus.PREPARING,
        accentColor: 'border-l-4 border-l-green-400',
        badgeColor: 'bg-green-100 text-green-700',
    },
    in_progress: {
        title: 'In Progress',
        status: ProjectStatus.IN_PROGRESS,
        accentColor: 'border-l-4 border-l-blue-400',
        badgeColor: 'bg-blue-100 text-blue-700',
    },
    to_do: {
        title: 'To Do',
        status: ProjectStatus.PLANNING,
        accentColor: 'border-l-4 border-l-purple-400',
        badgeColor: 'bg-purple-100 text-purple-700',
    },
    done: {
        title: 'Done',
        status: ProjectStatus.COMPLETED,
        accentColor: 'border-l-4 border-l-emerald-400',
        badgeColor: 'bg-emerald-100 text-emerald-700',
    },
};

const STATUS_TO_COLUMN: Record<ProjectStatus, BoardColumnKey> = {
    [ProjectStatus.PLANNING]: 'to_do',
    [ProjectStatus.PREPARING]: 'review',
    [ProjectStatus.IN_PROGRESS]: 'in_progress',
    [ProjectStatus.ON_HOLD]: 'review',
    [ProjectStatus.COMPLETED]: 'done',
    [ProjectStatus.CANCELLED]: 'review',
};

const BOARD_ORDER: BoardColumnKey[] = ['review', 'in_progress', 'to_do', 'done'];

export const getColumnFromStatus = (status: ProjectStatus | undefined): BoardColumnKey => {
    if (!status) return 'to_do';
    return STATUS_TO_COLUMN[status] ?? 'to_do';
};

interface TaskBoardControllerResult {
    project: Project | undefined;
    columns: BoardColumnData[];
    highlightedTask: Task | null;
    columnConfigMap: Record<BoardColumnKey, BoardColumnConfig>;
    draggingTaskId: string | null;
    activeHighlightId: string | null;
    handleDragStart: (taskId: string) => (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (columnKey: BoardColumnKey) => (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragEnd: () => void;
}

export const useTaskBoardController = (projectId: string): TaskBoardControllerResult => {
    const { projects, updateTaskStatus } = useProjectStore();
    const project = projects.find((item) => item.id === projectId);
    const searchParams = useSearchParams();
    const highlightedTaskId = searchParams?.get('highlight') ?? null;
    const allTasks = useTasks();
    const projectTasks = useMemo(() => allTasks.filter((task) => task.projectId === projectId), [allTasks, projectId]);

    const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
    const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

    const columns: BoardColumnData[] = useMemo(() => {
        return BOARD_ORDER.map((columnKey) => ({
            key: columnKey,
            config: COLUMN_CONFIG[columnKey],
            tasks: projectTasks.filter((task) => getColumnFromStatus(task.stage) === columnKey),
        }));
    }, [projectTasks]);

    useEffect(() => {
        if (!highlightedTaskId) {
            setActiveHighlightId(null);
            return;
        }

        setActiveHighlightId(highlightedTaskId);

        const target = document.getElementById(`task-card-${highlightedTaskId}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [highlightedTaskId, columns]);

    const highlightedTask = useMemo(() => {
        if (!activeHighlightId) return null;
        return projectTasks.find((task) => task.id === activeHighlightId) ?? null;
    }, [activeHighlightId, projectTasks]);

    const handleDragStart = useCallback(
        (taskId: string) => (event: React.DragEvent<HTMLDivElement>) => {
            event.dataTransfer.setData('text/plain', taskId);
            event.dataTransfer.effectAllowed = 'move';
            setDraggingTaskId(taskId);
        },
        [],
    );

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback(
        (columnKey: BoardColumnKey) => (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            if (!taskId) return;

            const targetStatus = COLUMN_CONFIG[columnKey].status;
            updateTaskStatus(projectId, taskId, targetStatus);
            setDraggingTaskId(null);
        },
        [projectId, updateTaskStatus],
    );

    const handleDragEnd = useCallback(() => {
        setDraggingTaskId(null);
    }, []);

    return {
        project,
        columns,
        highlightedTask,
        columnConfigMap: COLUMN_CONFIG,
        draggingTaskId,
        activeHighlightId,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDragEnd,
    };
};
