/**
 * @file task.utils.ts
 * @description Shared helpers for deriving task data from projects
 */

import { Project, ProjectStatus } from '../../projects/types/project.types';
import { TaskPriority } from '../types/task.types';

/**
 * Deterministically turns a string (usually a name) into a hex color
 */
export const stringToColor = (value: string): string => {
    if (!value) return '#6b7280';

    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash; // Keep in 32bit range
    }

    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const component = (hash >> (i * 8)) & 0xff;
        color += (`00${component.toString(16)}`).slice(-2);
    }

    return color;
};

/**
 * Returns Tailwind classes for a priority badge
 */
export const getPriorityColor = (priority: TaskPriority): string => {
    const palette: Record<TaskPriority, string> = {
        Critical: 'bg-red-100 text-red-700',
        High: 'bg-orange-100 text-orange-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        Low: 'bg-green-100 text-green-700'
    };

    return palette[priority] ?? 'bg-gray-100 text-gray-700';
};

/**
 * Estimate task priority from the project deadline
 */
export const getPriorityFromProject = (project: Project): TaskPriority => {
    if (!project.endDate) return 'Low';

    const endDate = new Date(project.endDate).getTime();
    const now = Date.now();
    const daysUntilDeadline = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

    if (Number.isNaN(daysUntilDeadline)) return 'Low';
    if (daysUntilDeadline <= 7) return 'Critical';
    if (daysUntilDeadline <= 14) return 'High';
    if (daysUntilDeadline <= 30) return 'Medium';
    return 'Low';
};

/**
 * Compute overall completion percentage for a project
 */
export const calculateProjectCompletion = (project: Project): number => {
    const { tasks, status } = project;

    if (tasks && tasks.length > 0) {
        const completed = tasks.filter(task => task.status === ProjectStatus.COMPLETED).length;
        return Math.round((completed / tasks.length) * 100);
    }

    const statusProgress: Record<ProjectStatus, number> = {
        [ProjectStatus.PLANNING]: 15,
        [ProjectStatus.PREPARING]: 30,
        [ProjectStatus.IN_PROGRESS]: 65,
        [ProjectStatus.ON_HOLD]: 45,
        [ProjectStatus.COMPLETED]: 100,
        [ProjectStatus.CANCELLED]: 0
    };

    return statusProgress[status] ?? 0;
};
