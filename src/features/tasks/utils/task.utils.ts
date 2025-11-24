/**
 * @file task.utils.ts
 * @description Task utility functions
 * @author Mebisoft Team
 * @created 2025-11-23
 */
import { Project, ProjectStatus } from '../../projects/types/project.types';
import { Task, TaskPriority } from '../types/task.types';

// Helper function to generate a consistent color from a string
export const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 85%)`; // Light pastel colors
};

// Helper function to determine priority based on project status
export const getPriorityFromProject = (project: Project): TaskPriority => {
    const daysUntilDeadline = Math.ceil(
        (new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline <= 7) return 'Critical';
    if (daysUntilDeadline <= 14) return 'High';
    if (daysUntilDeadline <= 30) return 'Medium';
    return 'Low';
};

// Calculate completion percentage based on project status
export const calculateProjectCompletion = (project: Project): number => {
    switch (project.status) {
        case ProjectStatus.PLANNING: return 10;
        case ProjectStatus.PREPARING: return 25;
        case ProjectStatus.IN_PROGRESS: return 50;
        case ProjectStatus.ON_HOLD: return 75;
        case ProjectStatus.COMPLETED: return 100;
        case ProjectStatus.CANCELLED: return 0;
        default: return 0;
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'Critical':
            return 'bg-red-100 text-red-800';
        case 'High':
            return 'bg-orange-100 text-orange-800';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'Low':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
