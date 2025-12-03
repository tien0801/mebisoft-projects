/**
 * @file taskStore.ts
 * @description UI state store for the Tasks feature
 */

'use client';

import { create } from 'zustand';
import { ProjectStatus } from '../../projects/types/project.types';
import { SortOption, ViewMode } from '../types/task.types';

interface TaskStoreState {
    viewMode: ViewMode;
    sortBy: SortOption;
    statusFilter: ProjectStatus | 'all';
    searchQuery: string;
    setViewMode: (mode: ViewMode) => void;
    setSortBy: (option: SortOption) => void;
    setStatusFilter: (status: ProjectStatus | 'all') => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
}

const defaultState = {
    viewMode: 'list' as ViewMode,
    sortBy: 'newest' as SortOption,
    statusFilter: 'all' as const,
    searchQuery: ''
};

export const useTaskStore = create<TaskStoreState>((set) => ({
    ...defaultState,
    setViewMode: (mode) => set({ viewMode: mode }),
    setSortBy: (option) => set({ sortBy: option }),
    setStatusFilter: (status) => set({ statusFilter: status }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    resetFilters: () => set({
        sortBy: defaultState.sortBy,
        statusFilter: defaultState.statusFilter,
        searchQuery: defaultState.searchQuery
    })
}));
