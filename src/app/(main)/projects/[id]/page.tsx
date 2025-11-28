/**
 * @file page.tsx
 * @description Page hiển thị chi tiết project
 * @author Mebisoft Team
 * @created 2025-11-24
 */

import { ProjectDetail } from '@/features/projects/components/ProjectDetail';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  return <ProjectDetail projectId={id} />;
}
