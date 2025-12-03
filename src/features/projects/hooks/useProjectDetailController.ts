'use client';

import { useMemo, useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { calculateProjectCompletion } from '../../tasks/utils/task.utils';
import { Project } from '../types';

export type ProjectDetailTab = 'gantt' | 'tracker' | 'expense' | 'timesheet' | 'bug' | 'task';

interface ProjectDetailController {
    project: Project | undefined;
    completion: number;
    activeTab: ProjectDetailTab;
    setActiveTab: (tab: ProjectDetailTab) => void;
}

export const useProjectDetailController = (projectId: string): ProjectDetailController => {
    const { projects } = useProjectStore();
    const [activeTab, setActiveTab] = useState<ProjectDetailTab>('gantt');

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const completion = project ? calculateProjectCompletion(project) : 0;

    return {
        project,
        completion,
        activeTab,
        setActiveTab,
    };
};
