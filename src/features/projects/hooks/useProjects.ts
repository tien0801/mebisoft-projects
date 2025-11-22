// /**
//  * @file useProjects.ts
//  * @description Custom hooks cho Projects sử dụng React Query + Zustand
//  * @author Mebisoft Team
//  * @created 2025-11-22
//  */

// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { projectApi } from '../api/projectApi';
// import { useProjectStore } from '../store/projectStore';
// import { ProjectFilter } from '../types/project.types';

// /**
//  * Hook lấy danh sách projects
//  * Sử dụng React Query để fetch data và cache
//  * Tự động sync với Zustand store
//  */
// export function useProjects(filter?: ProjectFilter) {
//   const setProjects = useProjectStore((state) => state.setProjects);

//   return useQuery({
//     queryKey: ['projects', filter], // Cache key
//     queryFn: async () => {
//       const data = await projectApi.getProjects(filter);
//       // Sync với Zustand store
//       setProjects(data);
//       return data;
//     },
//     staleTime: 5 * 60 * 1000, // Cache 5 phút
//   });
// }

// /**
//  * Hook lấy chi tiết 1 project
//  */
// export function useProjectDetail(id: string) {
//   const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

//   return useQuery({
//     queryKey: ['project', id],
//     queryFn: async () => {
//       const data = await projectApi.getProjectDetail(id);
//       // Sync với Zustand store
//       setSelectedProject(data);
//       return data;
//     },
//     enabled: !!id, // Chỉ fetch khi có id
//   });
// }

// /**
//  * Hook tạo project mới
//  * Sử dụng useMutation cho POST/PUT/DELETE
//  */
// export function useCreateProject() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: projectApi.createProject,
//     onSuccess: () => {
//       // Invalidate cache để refetch lại danh sách
//       queryClient.invalidateQueries({ queryKey: ['projects'] });
//     },
//   });
// }

// /**
//  * Hook cập nhật project
//  */
// export function useUpdateProject() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       projectApi.updateProject(id, data),
//     onSuccess: () => {
//       // Invalidate cache
//       queryClient.invalidateQueries({ queryKey: ['projects'] });
//     },
//   });
// }

// /**
//  * Hook xóa project
//  */
// export function useDeleteProject() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: projectApi.deleteProject,
//     onSuccess: () => {
//       // Invalidate cache
//       queryClient.invalidateQueries({ queryKey: ['projects'] });
//     },
//   });
// }
