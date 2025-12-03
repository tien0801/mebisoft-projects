/**
 * @file page.tsx
 * @description Project Detail Page
 * @author Mebisoft Team
 * @created 2025-11-26
 */

import { ProjectDetail } from '@/features/projects/components/ProjectDetail';

interface ProjectDetailPageProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { projectId } = await params;
    return <ProjectDetail projectId={projectId} />;
}
