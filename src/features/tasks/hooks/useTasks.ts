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

export const useTasks = (projectId?: string) => {
    const { projects, selectedProject } = useProjectStore();

    return useMemo(() => {
        const sourceProjects = projectId
            ? projects.filter((project) => project.id === projectId)
            : selectedProject
                ? [selectedProject]
                : projects;

        // Flatten tasks from all projects into a single array
        const allTasks: Task[] = [];

        sourceProjects.forEach(project => {
            // If project has tasks, use those
            if (project.tasks && project.tasks.length > 0) {
                project.tasks.forEach(task => {
                    allTasks.push({
                        id: task.id,
                        name: task.name,
                        projectName: project.name,
                        projectId: project.id,
                        stage: task.status,
                        priority: getPriorityFromProject(project),
                        endDate: task.endDate,
                        startDate: task.startDate,
                        assignedTo: task.assignedTo?.map(member => ({
                            name: member.name,
                            avatar: member.avatar,
                            role: member.role
                        })) || [],
                        completion: calculateProjectCompletion(project),
                        description: task.name
                    } as Task);
                });
            } else {
                // Fallback: if no tasks, treat the project as a task
                allTasks.push({
                    id: project.id,
                    name: project.name,
                    projectName: project.name,
                    projectId: project.id,
                    stage: project.status,
                    priority: getPriorityFromProject(project),
                    endDate: project.endDate,
                    startDate: project.startDate,
                    assignedTo: project.members?.map(member => ({
                        name: member.name,
                        avatar: member.avatar,
                        role: member.role
                    })) || [],
                    completion: calculateProjectCompletion(project),
                    description: project.description
                } as Task);
            }
        });

        return allTasks;
    }, [projects, selectedProject, projectId]);
};
