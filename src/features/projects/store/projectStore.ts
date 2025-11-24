/**
 * @file projectStore.ts
 * @description Zustand store cho quản lý state của Projects (Mock data - không call API)
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { create } from 'zustand';
import { Project, ProjectFilter } from '../types/project.types';
import { MOCK_PROJECTS } from '../data/mockProject';



// Interface định nghĩa shape của store
interface ProjectState {
  // State
  projects: Project[];              // Danh sách tất cả projects (mock data)
  selectedProject: Project | null;  // Project đang được chọn
  filter: ProjectFilter;            // Bộ lọc hiện tại

  // Actions
  setSelectedProject: (project: Project | null) => void; // Chọn 1 project
  setFilter: (filter: ProjectFilter) => void;           // Cập nhật filter
  clearFilter: () => void;                              // Xóa filter
  addProject: (project: Project) => void;               // Thêm project mới
  getFilteredProjects: () => Project[];                 // Lấy danh sách đã filter
}

/**
 * Zustand store cho Projects
 * Quản lý state toàn cục của danh sách dự án
 * Sử dụng mock data tĩnh - KHÔNG call API
 */
export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial state - Load mock data ngay từ đầu
  projects: MOCK_PROJECTS,
  selectedProject: null,
  filter: {},

  // Actions
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  setFilter: (filter) => set({ filter }),
  
  clearFilter: () => set({ filter: {} }),

  // Thêm project mới
  addProject: (project: Project) => set((state) => ({
    projects: [project, ...state.projects], // Thêm vào đầu danh sách
  })),

  // Lấy danh sách projects đã filter
  getFilteredProjects: () => {
    const { projects, filter } = get();
    
    // Nếu không có filter, trả về tất cả
    if (!filter.status && !filter.search) {
      return projects;
    }

    // Filter theo status
    let filtered = projects;
    if (filter.status) {
      filtered = filtered.filter((p) => p.status === filter.status);
    }

    // Filter theo search (tên dự án)
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  },
}));
