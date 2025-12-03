/**
 * @file ProjectList.tsx
 * @description Component hiển thị danh sách projects với Grid/List view và filters
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { ProjectCard } from './ProjectCard';
import { ProjectListView } from './ProjectListView';
import { ProjectToolbar } from './ProjectToolbar';
import { CreateProjectModal } from './modal/create/CreateProjectModal';
import { useProjectListController } from '../hooks/useProjectListController';

/**
 * ProjectList Component
 * Hiển thị danh sách projects với toolbar (view toggle, sort, filter)
 */
export function ProjectList() {
  const {
    filteredAndSortedProjects,
    viewMode,
    sortBy,
    statusFilter,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    setViewMode,
    setSortBy,
    setStatusFilter,
    handleViewDetail,
    handleDuplicate,
    handleEdit,
    handleDelete,
    handleCreateSubmit,
  } = useProjectListController();

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
          onCreateClick={openCreateModal}
        />
        <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-500">Không tìm thấy dự án nào</div>
        </div>

        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
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
        onCreateClick={openCreateModal}
      />

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleViewDetail(project)}
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
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
      />
    </>
  );
}
