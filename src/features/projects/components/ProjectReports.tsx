/**
 * @file ProjectReports.tsx
 * @description Project Reports component with filtering and status management
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Eye, Edit2, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { useProjectStore } from '../store/projectStore';
import { Project, ProjectStatus, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';
import { stringToColor, getPriorityFromProject, calculateProjectCompletion } from '../../tasks/utils/task.utils';
import { ProjectDetailsModal } from './modal/ProjectDetailsModal';
import { UpdateStatusModal } from './modal/UpdateStatusModal';

export const ProjectReports = () => {
    const { projects, setSelectedProject } = useProjectStore();

    // Temporary states for form inputs (not applied yet)
    const [tempSearchQuery, setTempSearchQuery] = useState('');
    const [tempStatusFilter, setTempStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [tempSelectedUser, setTempSelectedUser] = useState<string>('all');
    const [tempStartDate, setTempStartDate] = useState('');
    const [tempEndDate, setTempEndDate] = useState('');

    // Applied filter states (only update when Search is clicked)
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [selectedUser, setSelectedUser] = useState<string>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Debounced search for table search box
    const [debouncedTableSearch, setDebouncedTableSearch] = useState('');
    const [tableSearchInput, setTableSearchInput] = useState('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [selectedProject, setSelectedProjectModal] = useState<Project | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState<Project | null>(null);    // Debounce logic for table search input
    const handleTableSearchChange = (value: string) => {
        setTableSearchInput(value);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer - apply filter after 500ms of no typing
        debounceTimer.current = setTimeout(() => {
            setDebouncedTableSearch(value);
            setCurrentPage(1);
        }, 500);
    };

    // Get unique users from all projects
    const allUsers = useMemo(() => {
        const users = new Set<string>();
        projects.forEach(project => {
            project.members?.forEach(member => {
                users.add(member.name);
            });
        });
        return Array.from(users).sort();
    }, [projects]);

    // Filter projects based on criteria
    const filteredProjects = useMemo(() => {
        let filtered = [...projects];

        // Filter by status (from filter panel)
        if (statusFilter !== 'all') {
            filtered = filtered.filter(p => p.status === statusFilter);
        }

        // Filter by user (from filter panel)
        if (selectedUser !== 'all') {
            filtered = filtered.filter(p =>
                p.members?.some(m => m.name === selectedUser)
            );
        }

        // Filter by search query (from filter panel)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Filter by date range (from filter panel)
        if (startDate) {
            filtered = filtered.filter(p =>
                new Date(p.startDate) >= new Date(startDate)
            );
        }

        if (endDate) {
            filtered = filtered.filter(p =>
                new Date(p.endDate) <= new Date(endDate)
            );
        }

        // Filter by table search (debounced, auto-applies)
        if (debouncedTableSearch.trim()) {
            const query = debouncedTableSearch.toLowerCase();
            filtered = filtered.filter(p => {
                // Search by project name
                const nameMatch = p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query);

                // Search by status
                const statusMatch = PROJECT_STATUS_LABELS[p.status].toLowerCase().includes(query);

                // Search by start date (formatted as dd/mm/yyyy or mm/dd/yyyy)
                const startDateStr = new Date(p.startDate).toLocaleDateString('en-GB');
                const startDateMatch = startDateStr.includes(query);

                // Search by end date (formatted as dd/mm/yyyy or mm/dd/yyyy)
                const endDateStr = new Date(p.endDate).toLocaleDateString('en-GB');
                const endDateMatch = endDateStr.includes(query);

                return nameMatch || statusMatch || startDateMatch || endDateMatch;
            });
        }

        return filtered;
    }, [projects, statusFilter, selectedUser, searchQuery, startDate, endDate, debouncedTableSearch]);

    // Pagination
    const totalPages = Math.ceil(filteredProjects.length / entriesPerPage);
    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * entriesPerPage;
        return filteredProjects.slice(start, start + entriesPerPage);
    }, [filteredProjects, currentPage, entriesPerPage]);

    const handleViewDetails = (project: Project) => {
        setSelectedProjectModal(project);
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleUpdateStatus = (project: Project) => {
        setProjectToUpdate(project);
        setShowStatusModal(true);
    };

    const handleApplyFilters = () => {
        setSearchQuery(tempSearchQuery);
        setStatusFilter(tempStatusFilter);
        setSelectedUser(tempSelectedUser);
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        // Reset temporary states
        setTempSearchQuery('');
        setTempStatusFilter('all');
        setTempSelectedUser('all');
        setTempStartDate('');
        setTempEndDate('');

        // Reset table search
        setTableSearchInput('');
        setDebouncedTableSearch('');

        // Reset applied filters
        setSearchQuery('');
        setStatusFilter('all');
        setSelectedUser('all');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Reports</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <a href="/dashboard" className="text-green-600 hover:underline">Dashboard</a>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-gray-500">All Project</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Users Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Users</label>
                        <select
                            value={tempSelectedUser}
                            onChange={(e) => {
                                setTempSelectedUser(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-black bg-white text-black"
                        >
                            <option value="all">All Users</option>
                            {allUsers.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={tempStatusFilter}
                            onChange={(e) => {
                                setTempStatusFilter(e.target.value as ProjectStatus | 'all');
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-black bg-white text-black"
                        >
                            <option value="all">Select Status</option>
                            {Object.entries(PROJECT_STATUS_LABELS).map(([status, label]) => (
                                <option key={status} value={status}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                            type="date"
                            value={tempStartDate}
                            onChange={(e) => {
                                setTempStartDate(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-black"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input
                            type="date"
                            value={tempEndDate}
                            onChange={(e) => {
                                setTempEndDate(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-black"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-end gap-2">
                        <button
                            onClick={handleApplyFilters}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            <Search className="w-5 h-5 inline mr-2" />
                            Search
                        </button>
                        <button
                            onClick={handleResetFilters}
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            <RotateCw className="w-5 h-5 inline mr-2" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Entries Per Page */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => {
                                setEntriesPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-gray-600">entries per page</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={tableSearchInput}
                        onChange={(e) => {
                            handleTableSearchChange(e.target.value);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PROJECTS</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">START DATE</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DUE DATE</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PROJECTS MEMBERS</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">COMPLETION</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">STATUS</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedProjects.map(project => {
                                const completion = calculateProjectCompletion(project);
                                return (
                                    <tr key={project.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(project.startDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(project.endDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex -space-x-2">
                                                {project.members?.slice(0, 3).map((member, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-white"
                                                        style={{ backgroundColor: stringToColor(member.name) }}
                                                        title={member.name}
                                                    >
                                                        {getInitials(member.name)}
                                                    </div>
                                                ))}
                                                {project.members && project.members.length > 3 && (
                                                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-gray-400 border-2 border-white">
                                                        +{project.members.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${completion < 50
                                                        ? 'bg-red-500'
                                                        : completion < 80
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${completion}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-1 block">{completion}%</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${PROJECT_STATUS_COLORS[project.status]}`}>
                                                {PROJECT_STATUS_LABELS[project.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/reports/${project.id}`}
                                                    className="p-2 text-gray-500 hover:text-blue-600 transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleUpdateStatus(project)}
                                                    className="p-2 text-gray-500 hover:text-green-600 transition"
                                                    title="Update Status"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        Showing {paginatedProjects.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, filteredProjects.length)} of {filteredProjects.length} results
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ProjectDetailsModal
                project={selectedProject}
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            />

            <UpdateStatusModal
                project={projectToUpdate}
                isOpen={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                onUpdate={(projectId: string, newStatus: ProjectStatus) => {
                    // TODO: Persist status update to store
                    console.log(`Update project ${projectId} to ${newStatus}`);
                }}
            />
        </div>
    );
};
