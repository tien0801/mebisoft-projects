'use client';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useProjectStore } from '../../projects/store/projectStore';
import { ProjectStatus } from '../../projects/types/project.types';
import { useTaskStore } from '../store/taskStore';
import { SortOption, Task, ViewMode } from '../types/task.types';
import { useTasks } from './useTasks';

interface GroupedProjectTasks {
    projectId: string;
    projectName: string;
    tasks: Task[];
}

interface TaskListController {
    projectName: string;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    statusFilter: ProjectStatus | 'all';
    handleStatusFilterChange: (status: ProjectStatus | 'all') => void;
    searchQuery: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    filteredAndSortedTasks: Task[];
    groupedProjects: GroupedProjectTasks[];
    tasksCount: number;
    filteredCount: number;
    expandedProjects: string[];
    toggleProjectExpansion: (projectId: string) => void;
    getInitials: (name: string) => string;
}

export const useTaskListController = (projectId?: string): TaskListController => {
    const tasks = useTasks(projectId);
    const { selectedProject, projects } = useProjectStore();
    const {
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
    } = useTaskStore();

    const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
        },
        [setSearchQuery],
    );

    const filteredAndSortedTasks = useMemo(() => {
        let filteredTasks = [...tasks];

        if (statusFilter && statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter((task) => task.stage === statusFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filteredTasks = filteredTasks.filter((task) => {
                const matchesName = task.name.toLowerCase().includes(query);
                const matchesAssignee = task.assignedTo?.some((user) => user?.name?.toLowerCase().includes(query));
                return matchesName || matchesAssignee;
            });
        }

        return filteredTasks.sort((a: Task, b: Task) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
                case 'oldest':
                    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
                case 'a-z':
                    return a.name.localeCompare(b.name);
                case 'z-a':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }, [tasks, statusFilter, searchQuery, sortBy]);

    const groupedProjects = useMemo(() => {
        const map = new Map<string, GroupedProjectTasks>();
        const order: GroupedProjectTasks[] = [];

        filteredAndSortedTasks.forEach((task) => {
            if (!map.has(task.projectId)) {
                const group: GroupedProjectTasks = {
                    projectId: task.projectId,
                    projectName: task.projectName,
                    tasks: [],
                };
                map.set(task.projectId, group);
                order.push(group);
            }

            map.get(task.projectId)?.tasks.push(task);
        });

        return order;
    }, [filteredAndSortedTasks]);

    const toggleProjectExpansion = useCallback((targetProjectId: string) => {
        setExpandedProjects((prev) =>
            prev.includes(targetProjectId)
                ? prev.filter((id) => id !== targetProjectId)
                : [...prev, targetProjectId],
        );
    }, []);

    const handleStatusFilterChange = useCallback(
        (newStatus: ProjectStatus | 'all') => {
            setStatusFilter(newStatus);
        },
        [setStatusFilter],
    );

    const getInitials = useCallback((name: string) => {
        if (!name) return '';
        return name
            .split(' ')
            .filter(Boolean)
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }, []);

    const contextProject = projectId
        ? projects.find((project) => project.id === projectId) ?? null
        : selectedProject;

    const projectName = contextProject?.name || (projectId ? 'Project Tasks' : 'All Project Tasks');

    return {
        projectName,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        statusFilter,
        handleStatusFilterChange,
        searchQuery,
        handleSearchChange,
        filteredAndSortedTasks,
        groupedProjects,
        tasksCount: tasks.length,
        filteredCount: filteredAndSortedTasks.length,
        expandedProjects,
        toggleProjectExpansion,
        getInitials,
    };
};
