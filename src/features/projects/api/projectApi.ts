/**
 * @file projectApi.ts
 * @description API functions cho Projects
 * @author Mebisoft Team
 * @created 2025-11-22
 */

import { apiClient } from '@/core/api/client';
import { Project, ProjectFilter } from '../types/project.types';

// Base endpoint cho projects
const PROJECTS_ENDPOINT = '/projects';

/**
 * Project API
 * Tất cả functions để gọi API liên quan đến projects
 */
export const projectApi = {
  /**
   * Lấy danh sách tất cả projects
   * @param filter - Bộ lọc (optional)
   * @returns Promise<Project[]>
   */
  getProjects: async (filter?: ProjectFilter): Promise<Project[]> => {
    const { data } = await apiClient.get<Project[]>(PROJECTS_ENDPOINT, {
      params: filter,
    });
    return data;
  },

  /**
   * Lấy chi tiết 1 project
   * @param id - ID của project
   * @returns Promise<Project>
   */
  getProjectDetail: async (id: string): Promise<Project> => {
    const { data } = await apiClient.get<Project>(`${PROJECTS_ENDPOINT}/${id}`);
    return data;
  },

  /**
   * Tạo project mới
   * @param projectData - Dữ liệu project (không có id)
   * @returns Promise<Project>
   */
  createProject: async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const { data } = await apiClient.post<Project>(PROJECTS_ENDPOINT, projectData);
    return data;
  },

  /**
   * Cập nhật project
   * @param id - ID của project
   * @param projectData - Dữ liệu cần update
   * @returns Promise<Project>
   */
  updateProject: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const { data } = await apiClient.put<Project>(
      `${PROJECTS_ENDPOINT}/${id}`,
      projectData
    );
    return data;
  },

  /**
   * Xóa project
   * @param id - ID của project
   * @returns Promise<void>
   */
  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`${PROJECTS_ENDPOINT}/${id}`);
  },
};
