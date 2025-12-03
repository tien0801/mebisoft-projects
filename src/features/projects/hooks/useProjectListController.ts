'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectMember, ProjectStatus } from '../types/project.types';
import { useProjectStore } from '../store/projectStore';
import { MOCK_USERS } from '../data/mockMember';
import { ProjectFormData } from '../components/modal/CreateProjectModal';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

type ProjectListController = {
    filteredAndSortedProjects: Project[];
    viewMode: ViewMode;
    sortBy: SortOption;
    statusFilter: ProjectStatus | 'all';
    isCreateModalOpen: boolean;
    openCreateModal: () => void;
    closeCreateModal: () => void;
    setViewMode: (mode: ViewMode) => void;
    setSortBy: (sort: SortOption) => void;
    setStatusFilter: (status: ProjectStatus | 'all') => void;
    handleViewDetail: (project: Project) => void;
    handleDuplicate: (project: Project) => void;
    handleEdit: (project: Project) => void;
    handleDelete: (project: Project) => void;
    handleCreateSubmit: (data: ProjectFormData) => void;
};

export const useProjectListController = (): ProjectListController => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const projects = useProjectStore((state) => state.projects);
    const addProject = useProjectStore((state) => state.addProject);

    const filteredAndSortedProjects = useMemo(() => {
        let result = [...projects];

        if (statusFilter !== 'all') {
            result = result.filter((project) => project.status === statusFilter);
        }

        switch (sortBy) {
            case 'newest':
                return result.sort(
                    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
                );
            case 'oldest':
                return result.sort(
                    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
                );
            case 'a-z':
                return result.sort((a, b) => a.name.localeCompare(b.name));
            case 'z-a':
                return result.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return result;
        }
    }, [projects, sortBy, statusFilter]);

    const handleViewDetail = useCallback(
        (project: Project) => {
            router.push(`/projects/${project.id}`);
        },
        [router],
    );

    const handleDuplicate = useCallback((project: Project) => {
        console.log('Duplicate project:', project.name);
        alert(`Nhân bản dự án: ${project.name}`);
    }, []);

    const handleEdit = useCallback(
        (project: Project) => {
            router.push(`/projects/${project.id}/edit`);
        },
        [router],
    );

    const handleDelete = useCallback((project: Project) => {
        if (confirm(`Bạn có chắc muốn xóa dự án "${project.name}"?`)) {
            alert(`Đã xóa dự án: ${project.name}`);
        }
    }, []);

    const handleCreateSubmit = useCallback(
        (data: ProjectFormData) => {
            const selectedUser = MOCK_USERS.find((user) => user.id === data.user);

            const members: ProjectMember[] = selectedUser
                ? [
                    {
                        id: selectedUser.id,
                        name: selectedUser.name,
                        avatar: selectedUser.avatar,
                        role: selectedUser.role,
                    },
                ]
                : [];

            const newProject: Project = {
                id: `project-${Date.now()}`,
                name: data.name,
                description: data.description || 'No description provided',
                status: data.status,
                startDate: data.startDate || new Date().toISOString().split('T')[0],
                endDate: data.endDate || new Date().toISOString().split('T')[0],
                members,
                clientId: data.client,
                managerId: data.user,
            };

            addProject(newProject);
            alert(`✅ Đã tạo dự án: ${data.name}`);
        },
        [addProject],
    );

    const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
    const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

    return {
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
    };
};
