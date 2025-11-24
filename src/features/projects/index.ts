/**
 * @file index.ts
 * @description Barrel export cho Projects feature
 * @author Mebisoft Team
 * @created 2025-11-22
 */

// Components
export { ProjectCard } from './components/ProjectCard';
export { ProjectList } from './components/ProjectList';
export { ProjectToolbar } from './components/ProjectToolbar';
export { ProjectListView } from './components/ProjectListView';
export { ProjectDetail } from './components/ProjectDetail';
export { CreateProjectModal } from './components/modal/CreateProjectModal';
export type { ProjectFormData } from './components/modal/CreateProjectModal';

// Store
export { useProjectStore } from './store/projectStore';

// Types
export type { Project, ProjectMember, ProjectFilter } from './types/project.types';
export { ProjectStatus, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from './types/project.types';
