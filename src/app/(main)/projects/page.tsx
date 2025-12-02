/**
 * @file page.tsx
 * @description Projects page - Hiển thị danh sách Projects
 * @author Mebisoft Team
 * @created 2025-11-22
 */

import { ProjectList } from '@/features/projects';

export default function ProjectsPage() {
  return (
    <div>
      {/* Project List - Toolbar có title bên trong */}
      <ProjectList />
    </div>
  );
}
