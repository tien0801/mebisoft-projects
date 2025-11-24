/**
 * @file page.tsx
 * @description Page hiển thị chi tiết project
 * @author Mebisoft Team
 * @created 2025-11-24
 */

import { ProjectDetail } from '@/features/projects/components/ProjectDetail';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetail projectId={params.id} />;
}
