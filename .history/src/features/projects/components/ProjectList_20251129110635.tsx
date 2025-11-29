/**
 * @file ProjectList.tsx
 * @description Component hiển thị danh sách projects với Grid/List view và filters
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useState, useMemo } from 'react';
import { useProjectStore } from '../store/projectStore';
import { ProjectCard } from './ProjectCard';
import { ProjectListView } from './ProjectListView';
import { ProjectToolbar } from './ProjectToolbar';
import { CreateProjectModal, ProjectFormData } from './modal/create/CreateProjectModal';
import { useRouter } from 'next/navigation';
import { Project, ProjectStatus, ProjectMember } from '../types/project.types';
import { MOCK_USERS } from '../data/mockMember';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

/**
 * ProjectList Component
 * Hiển thị danh sách projects với toolbar (view toggle, sort, filter)
 */
export function ProjectList() {
  const router = useRouter();
  
  // State cho toolbar
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Lấy projects từ Zustand store
  const projects = useProjectStore((state) => state.projects);

  // Filter và sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Filter theo status
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [projects, statusFilter, sortBy]);

  // Handle actions
  const handleDuplicate = (project: Project) => {
    console.log('Duplicate project:', project.name);
    alert(`Nhân bản dự án: ${project.name}`);
  };

  const handleEdit = (project: Project) => {
    console.log('Edit project:', project.name);
    router.push(`/projects/${project.id}/edit`);
  };

  const handleDelete = (project: Project) => {
    console.log('Delete project:', project.name);
    if (confirm(`Bạn có chắc muốn xóa dự án "${project.name}"?`)) {
      alert(`Đã xóa dự án: ${project.name}`);
    }
  };

  const addProject = useProjectStore((state) => state.addProject);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (data: ProjectFormData) => {
    // Tìm user đã chọn từ mock data
    const selectedUser = MOCK_USERS.find(u => u.id === data.user);
    
    // Tạo members array từ user đã chọn
    const members: ProjectMember[] = selectedUser ? [{
      id: selectedUser.id,
      name: selectedUser.name,
      avatar: selectedUser.avatar,
      role: selectedUser.role,
    }] : [];

    // Tạo project mới
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: data.name,
      description: data.description || 'No description provided',
      status: data.status,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date().toISOString().split('T')[0],
      members: members, // Thêm user đã chọn vào members
      clientId: data.client,
      managerId: data.user,
    };

    // Thêm vào store
    addProject(newProject);
    
    // Hiển thị thông báo
    alert(`✅ Đã tạo dự án: ${data.name}`);
  };

  // Empty state
  if (!filteredAndSortedProjects || filteredAndSortedProjects.length === 0) {
    return (
      <>
        <ProjectToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateClick={handleCreate}
        />
        <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-500">Không tìm thấy dự án nào</div>
        </div>
        
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSubmit}
        />
      </>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <ProjectToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateClick={handleCreate}
      />

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => router.push(`/projects/${project.id}`)}
              onDuplicate={handleDuplicate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <ProjectListView
          projects={filteredAndSortedProjects}
          onDuplicate={handleDuplicate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Create Modal */}
      {/* <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      /> */}
    </>
  );
}
