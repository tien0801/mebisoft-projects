/**
 * @file task.types.ts
 * @description Task types and interfaces
 * @author Mebisoft Team
 * @created 2025-11-23
 */

import { ProjectStatus } from '../../projects/types/project.types';

// Task types
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface TaskMember {
    name: string;
    avatar?: string;
    role?: string;
}

export interface Task {
    id: string;
    name: string;
    stage: ProjectStatus;
    priority: TaskPriority;
    endDate: string;
    assignedTo: TaskMember[];
    completion: number;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

// Task filter types
export interface TaskFilterOptions {
    status?: ProjectStatus | 'all';
    searchQuery?: string;
    sortBy?: SortOption;
}
