/**
 * @file page.tsx
 * @description Task Detail Page
 * @author Mebisoft Team
 * @created 2025-11-26
 */

import { TaskDetail } from '@/features/tasks/components/TaskDetail';

interface TaskDetailPageProps {
    params: Promise<{
        projectId: string;
        taskId: string;
    }>;
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
    const { taskId } = await params;
    return <TaskDetail taskId={taskId} />;
}
