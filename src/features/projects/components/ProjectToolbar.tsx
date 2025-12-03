/**
 * @file ProjectToolbar.tsx
 * @description Toolbar với title và controls ngang hàng - Cùng kích thước
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';
import { LayoutGrid, List, Plus, Filter } from 'lucide-react';

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
 * Title + 4 controls ngang hàng với kích thước đồng nhất
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
    <div className="mb-6 pt-2">
      {/* Container cho Title và Breadcrumb */}
      <div className="mb-4">
        {/* 1. Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Projects</h1>

        {/* 2. Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-green-500 font-medium">Dashboard</span>
          <span>/</span>
          <span className="text-gray-600">Projects</span>
        </div>
      </div>

      {/* 3. Controls (Row Filter, Sort, View, Create) */}
      {/* Sử dụng flex-wrap để các controls tự động xuống dòng khi màn hình nhỏ */}
      <div className="flex flex-wrap items-center justify-end gap-3">

        {/* Khối 1: View Toggle (Grid/List) - h-[42px] */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm h-[42px]">
          {/* ... (Giữ nguyên code View Toggle) ... */}
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-colors h-full flex items-center justify-center ${viewMode === 'grid'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
            title="Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-colors h-full flex items-center justify-center ${viewMode === 'list'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Khối 2: Sort Dropdown - h-[42px] */}
        <div className="relative h-[42px]">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-full px-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm appearance-none cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">From A-Z</option>
            <option value="z-a">From Z-A</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Khối 3: Status Filter Dropdown - h-[42px] */}
        {/* ... (Giữ nguyên code Status Filter) ... */}
        <div className="relative h-[42px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as ProjectStatus | 'all')}
            className="h-full px-3 pr-10 bg-green-500 text-white border border-green-500 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md appearance-none cursor-pointer"
          >
            <option value="all">Status</option>
            {/* ... options ... */}
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
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Khối 4: Create Button - h-[42px] */}
        {/* ... (Giữ nguyên code Create Button) ... */}
        <button
          onClick={onCreateClick}
          className="h-[42px] px-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
