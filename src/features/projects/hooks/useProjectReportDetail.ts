'use client';

import { useMemo } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Project } from '../types';
import { calculateProjectCompletion } from '../../tasks/utils/task.utils';

interface UseProjectReportDetailResult {
    project: Project | undefined;
    completion: number;
}

export const useProjectReportDetail = (projectId: string): UseProjectReportDetailResult => {
    const { projects } = useProjectStore();

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const completion = project ? calculateProjectCompletion(project) : 0;

    return {
        project,
        completion,
    };
};
