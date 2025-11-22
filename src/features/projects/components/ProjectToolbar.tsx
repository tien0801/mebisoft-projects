/**
 * @file ProjectToolbar.tsx
 * @description Toolbar với các nút: View toggle, Sort, Filter, Create
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';
import { LayoutGrid, List, Plus } from 'lucide-react';

import { ProjectStatus, PROJECT_STATUS_LABELS } from '../types/project.types';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

interface ProjectToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  statusFilter: ProjectStatus | 'all';
  onStatusFilterChange: (status: ProjectStatus | 'all') => void;
  onCreateClick?: () => void;
}

/**
 * ProjectToolbar Component
 * 4 khối: View Toggle, Sort, Status Filter, Create Button
 */
export function ProjectToolbar({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  statusFilter,
  onStatusFilterChange,
  onCreateClick,
}: ProjectToolbarProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Khối 1: View Toggle (Grid/List) */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded transition-colors ${viewMode === 'grid'
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
          title="Grid View"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded transition-colors ${viewMode === 'list'
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
          title="List View"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Khối 2: Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="a-z">From A-Z</option>
        <option value="z-a">From Z-A</option>
      </select>

      {/* Khối 3: Status Filter Dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as ProjectStatus | 'all')}
        className="px-4 py-2 bg-white  border-gray-200 rounded-lg text-sm text-black hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">Show All</option>
        <option value={ProjectStatus.IN_PROGRESS}>
          {PROJECT_STATUS_LABELS[ProjectStatus.IN_PROGRESS]}
        </option>
        <option value={ProjectStatus.ON_HOLD}>
          {PROJECT_STATUS_LABELS[ProjectStatus.ON_HOLD]}
        </option>
        <option value={ProjectStatus.COMPLETED}>
          {PROJECT_STATUS_LABELS[ProjectStatus.COMPLETED]}
        </option>
        <option value={ProjectStatus.CANCELLED}>
          {PROJECT_STATUS_LABELS[ProjectStatus.CANCELLED]}
        </option>
        <option value={ProjectStatus.PLANNING}>
          {PROJECT_STATUS_LABELS[ProjectStatus.PLANNING]}
        </option>
        <option value={ProjectStatus.PREPARING}>
          {PROJECT_STATUS_LABELS[ProjectStatus.PREPARING]}
        </option>
      </select>

      {/* Khối 4: Create Button */}
      <button
        onClick={onCreateClick}
        className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>Create</span>
      </button>
    </div>
  );
}
