import { TaskBoard } from '@/features/tasks/components/TaskBoard';

interface ProjectTaskBoardPageProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectTaskBoardPage({ params }: ProjectTaskBoardPageProps) {
    const { projectId } = await params;
    return <TaskBoard projectId={projectId} />;
}
