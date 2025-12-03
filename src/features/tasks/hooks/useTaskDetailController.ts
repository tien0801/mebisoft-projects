'use client';

import { useCallback, useMemo } from 'react';

import { useProjectStore } from '../../projects/store/projectStore';
import { calculateProjectCompletion, getPriorityFromProject } from '../utils/task.utils';
import { TaskDetailData, TaskDetailProps } from '../types/task-component.types';

export const useTaskDetailController = ({ taskId, projectId }: TaskDetailProps) => {
    const { projects } = useProjectStore();

    const taskData = useMemo<TaskDetailData | null>(() => {
        const scopedProjects = projectId ? projects.filter((project) => project.id === projectId) : projects;

        for (const project of scopedProjects) {
            const projectTasks = project.tasks ?? [];
            const foundTask = projectTasks.find((task) => task.id === taskId);

            if (foundTask) {
                return {
                    id: foundTask.id,
                    name: foundTask.name,
                    description: project.description,
                    status: foundTask.status ?? project.status,
                    priority: getPriorityFromProject(project),
                    startDate: foundTask.startDate ?? project.startDate,
                    endDate: foundTask.endDate ?? project.endDate,
                    assignedTo:
                        foundTask.assignedTo?.map((member) => ({
                            name: member.name,
                            avatar: member.avatar,
                            role: member.role,
                        })) || [],
                    completion: calculateProjectCompletion(project),
                    projectId: project.id,
                    projectName: project.name,
                } satisfies TaskDetailData;
            }
        }

        return null;
    }, [projects, projectId, taskId]);

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

    return {
        taskData,
        getInitials,
    };
};
