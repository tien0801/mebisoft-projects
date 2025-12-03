/**
 * @file page.tsx
 * @description Project Report Detail Page
 * @author Mebisoft Team
 * @created 2025-11-26
 */

import { ProjectReportDetail } from '@/features/projects/components/ProjectReportDetail';

interface ProjectReportDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectReportDetailPage({ params }: ProjectReportDetailPageProps) {
    const { id } = await params;
    return <ProjectReportDetail projectId={id} />;
}
