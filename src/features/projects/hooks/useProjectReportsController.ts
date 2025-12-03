'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Project, ProjectStatus, ProjectType } from '../types';
import { useProjectStore } from '../store/projectStore';

interface ProjectReportsControllerResult {
    allUsers: string[];
    tempSearchQuery: string;
    setTempSearchQuery: (value: string) => void;
    tempStatusFilter: ProjectStatus | 'all';
    setTempStatusFilter: (value: ProjectStatus | 'all') => void;
    tempProjectTypeFilter: ProjectType | 'all';
    setTempProjectTypeFilter: (value: ProjectType | 'all') => void;
    tempSelectedUser: string;
    setTempSelectedUser: (value: string) => void;
    tempStartDate: string;
    setTempStartDate: (value: string) => void;
    tempEndDate: string;
    setTempEndDate: (value: string) => void;
    tableSearchInput: string;
    handleTableSearchChange: (value: string) => void;
    entriesPerPage: number;
    setEntriesPerPage: (value: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    paginatedProjects: Project[];
    filteredProjects: Project[];
    totalPages: number;
    projectTypeFilter: ProjectType | 'all';
    setProjectTypeFilter: (value: ProjectType | 'all') => void;
    handleApplyFilters: () => void;
    handleResetFilters: () => void;
    handleViewDetails: (project: Project) => void;
    handleUpdateStatus: (project: Project) => void;
    selectedProject: Project | null;
    showDetailsModal: boolean;
    closeDetailsModal: () => void;
    projectToUpdate: Project | null;
    showStatusModal: boolean;
    closeStatusModal: () => void;
}

const debounceDelay = 500;

type TimeoutRef = ReturnType<typeof setTimeout> | null;

export const useProjectReportsController = (): ProjectReportsControllerResult => {
    const { projects, setSelectedProject } = useProjectStore();

    const [tempSearchQuery, setTempSearchQuery] = useState('');
    const [tempStatusFilter, setTempStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [tempProjectTypeFilter, setTempProjectTypeFilter] = useState<ProjectType | 'all'>('all');
    const [tempSelectedUser, setTempSelectedUser] = useState('all');
    const [tempStartDate, setTempStartDate] = useState('');
    const [tempEndDate, setTempEndDate] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectType | 'all'>('all');
    const [selectedUser, setSelectedUser] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [tableSearchInput, setTableSearchInput] = useState('');
    const [debouncedTableSearch, setDebouncedTableSearch] = useState('');
    const debounceTimerRef = useRef<TimeoutRef>(null);

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedProject, setSelectedProjectModal] = useState<Project | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState<Project | null>(null);

    const allUsers = useMemo(() => {
        const users = new Set<string>();
        projects.forEach((project) => {
            project.members?.forEach((member) => {
                users.add(member.name);
            });
        });
        return Array.from(users).sort();
    }, [projects]);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const handleTableSearchChange = (value: string) => {
        setTableSearchInput(value);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            setDebouncedTableSearch(value);
            setCurrentPage(1);
        }, debounceDelay);
    };

    const filteredProjects = useMemo(() => {
        let filtered = [...projects];

        if (statusFilter !== 'all') {
            filtered = filtered.filter((project) => project.status === statusFilter);
        }

        if (projectTypeFilter !== 'all') {
            filtered = filtered.filter((project) => project.projectType === projectTypeFilter);
        }

        if (selectedUser !== 'all') {
            filtered = filtered.filter((project) =>
                project.members?.some((member) => member.name === selectedUser)
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((project) =>
                project.name.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query)
            );
        }

        if (startDate) {
            filtered = filtered.filter((project) => new Date(project.startDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter((project) => new Date(project.endDate) <= new Date(endDate));
        }

        if (debouncedTableSearch.trim()) {
            const query = debouncedTableSearch.toLowerCase();
            filtered = filtered.filter((project) => {
                const nameMatch =
                    project.name.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query);
                const statusMatch = project.status.toLowerCase().includes(query);
                const startDateStr = new Date(project.startDate).toLocaleDateString('en-GB');
                const endDateStr = new Date(project.endDate).toLocaleDateString('en-GB');
                return (
                    nameMatch ||
                    statusMatch ||
                    startDateStr.includes(query) ||
                    endDateStr.includes(query)
                );
            });
        }

        return filtered;
    }, [projects, statusFilter, projectTypeFilter, selectedUser, searchQuery, startDate, endDate, debouncedTableSearch]);

    const totalPages = Math.ceil(filteredProjects.length / entriesPerPage) || 1;

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredProjects.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredProjects, currentPage, entriesPerPage]);

    const handleApplyFilters = () => {
        setSearchQuery(tempSearchQuery);
        setStatusFilter(tempStatusFilter);
        setProjectTypeFilter(tempProjectTypeFilter);
        setSelectedUser(tempSelectedUser);
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setTempSearchQuery('');
        setTempStatusFilter('all');
        setTempProjectTypeFilter('all');
        setTempSelectedUser('all');
        setTempStartDate('');
        setTempEndDate('');
        setTableSearchInput('');
        setDebouncedTableSearch('');
        setSearchQuery('');
        setStatusFilter('all');
        setProjectTypeFilter('all');
        setSelectedUser('all');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1);
    };

    const handleViewDetails = (project: Project) => {
        setSelectedProjectModal(project);
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleUpdateStatus = (project: Project) => {
        setProjectToUpdate(project);
        setShowStatusModal(true);
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
    };

    const closeStatusModal = () => {
        setShowStatusModal(false);
    };

    return {
        allUsers,
        tempSearchQuery,
        setTempSearchQuery,
        tempStatusFilter,
        setTempStatusFilter,
        tempProjectTypeFilter,
        setTempProjectTypeFilter,
        tempSelectedUser,
        setTempSelectedUser,
        tempStartDate,
        setTempStartDate,
        tempEndDate,
        setTempEndDate,
        tableSearchInput,
        handleTableSearchChange,
        entriesPerPage,
        setEntriesPerPage,
        currentPage,
        setCurrentPage,
        paginatedProjects,
        filteredProjects,
        totalPages,
        projectTypeFilter,
        setProjectTypeFilter,
        handleApplyFilters,
        handleResetFilters,
        handleViewDetails,
        handleUpdateStatus,
        selectedProject,
        showDetailsModal,
        closeDetailsModal,
        projectToUpdate,
        showStatusModal,
        closeStatusModal,
    };
};
