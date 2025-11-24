/**
 * @file useTasks.ts
 * @description Hook to derive tasks from projects
 * @author Mebisoft Team
 * @created 2025-11-23
 */
import { useMemo } from 'react';
import { useProjectStore } from '../../projects/store/projectStore';
import { Task } from '../types/task.types';
import { getPriorityFromProject, calculateProjectCompletion } from '../utils/task.utils';

export const useTasks = () => {
    const { projects, selectedProject } = useProjectStore();

    return useMemo(() => {
        const sourceProjects = selectedProject ? [selectedProject] : projects;

        return sourceProjects.map(project => ({
            id: project.id,
            name: project.name,
            stage: project.status,
            priority: getPriorityFromProject(project),
            endDate: project.endDate,
            assignedTo: project.members?.map(member => ({
                name: member.name,
                avatar: member.avatar,
                role: member.role
            })) || [],
            completion: calculateProjectCompletion(project)
        } as Task));
    }, [projects, selectedProject]);
};
