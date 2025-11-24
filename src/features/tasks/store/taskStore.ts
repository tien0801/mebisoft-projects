/**
 * @file taskStore.ts
 * @description Zustand store for tasks feature
 * @author Mebisoft Team
 * @created 2025-11-23
 */
import { create } from 'zustand';
import { Task, ViewMode, SortOption } from '../types/task.types';
import { ProjectStatus } from '../../projects/types/project.types';

interface TaskState {
    tasks: Task[];
    viewMode: ViewMode;
    sortBy: SortOption;
    statusFilter: ProjectStatus | 'all';
    searchQuery: string;
    setTasks: (tasks: Task[]) => void;
    setViewMode: (mode: ViewMode) => void;
    setSortBy: (option: SortOption) => void;
    setStatusFilter: (status: ProjectStatus | 'all') => void;
    setSearchQuery: (query: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    viewMode: 'list',
    sortBy: 'newest',
    statusFilter: 'all',
    searchQuery: '',
    setTasks: (tasks) => set({ tasks }),
    setViewMode: (viewMode) => set({ viewMode }),
    setSortBy: (sortBy) => set({ sortBy }),
    setStatusFilter: (statusFilter) => set({ statusFilter }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
