/**
 * @file page.tsx
 * @description Page hiển thị quản lý dự toán của project
 * @author Mebisoft Team
 * @created 2025-11-27
 */

import { ProjectBudget } from '@/features/projects/components/ProjectBudget';

interface ProjectBudgetPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectBudgetPage({ params }: ProjectBudgetPageProps) {
  const { projectId } = await params;
  return <ProjectBudget projectId={projectId} />;
}
