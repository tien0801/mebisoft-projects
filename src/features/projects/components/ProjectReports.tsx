/**
 * @file ProjectReports.tsx
 * @description Project Reports component with filtering and status management
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import { Search, Eye, Edit2, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { ProjectStatus, ProjectType, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS, PROJECT_TYPE_LABELS } from '../types/project.types';
import { stringToColor, calculateProjectCompletion } from '../../tasks/utils/task.utils';
import { ProjectDetailsModal } from './modal/ProjectDetailsModal';
import { UpdateStatusModal } from './modal/UpdateStatusModal';
import { useProjectReportsController } from '../hooks/useProjectReportsController';

export const ProjectReports = () => {
    const {
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
    } = useProjectReportsController();

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Users Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Users</label>
                        <select
                            value={tempSelectedUser}
                            onChange={(e) => {
                                setTempSelectedUser(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white "
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500  text-black bg-white"
                        >
                            <option value="all">Select Status</option>
                            {Object.entries(PROJECT_STATUS_LABELS).map(([status, label]) => (
                                <option key={status} value={status}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Project Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                        <select
                            value={tempProjectTypeFilter}
                            onChange={(e) => {
                                setTempProjectTypeFilter(e.target.value as ProjectType | 'all');
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                        >
                            <option value="all">All Types</option>
                            {Object.entries(PROJECT_TYPE_LABELS).map(([type, label]) => (
                                <option key={type} value={type}>{label}</option>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black "
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
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
                                                    href={`/reportboard/${project.id}`}
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
                onClose={closeDetailsModal}
            />

            <UpdateStatusModal
                project={projectToUpdate}
                isOpen={showStatusModal}
                onClose={closeStatusModal}
                onUpdate={(projectId: string, newStatus: ProjectStatus) => {
                    // TODO: Persist status update to store
                    console.log(`Update project ${projectId} to ${newStatus}`);
                }}
            />
        </div>
    );
};
