/**
 * @file task-component.types.ts
 * @description Component-specific types for the Tasks feature
 */

import { ProjectStatus } from '../../projects/types/project.types';
import { Task, TaskPriority } from './task.types';

export interface TaskBoardProps {
    projectId: string;
}

export interface TaskListProps {
    projectId?: string;
}

export interface TaskDetailProps {
    taskId: string;
    projectId?: string;
}

export interface TaskDetailData {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    priority: TaskPriority;
    startDate: string;
    endDate: string;
    assignedTo: { name: string; avatar?: string; role?: string }[];
    completion: number;
    projectId: string;
    projectName: string;
}

export type BoardColumnKey = 'review' | 'in_progress' | 'to_do' | 'done';

export interface BoardColumnConfig {
    title: string;
    status: ProjectStatus;
    accentColor: string;
    badgeColor: string;
}

export interface BoardColumnData {
    key: BoardColumnKey;
    config: BoardColumnConfig;
    tasks: Task[];
}
