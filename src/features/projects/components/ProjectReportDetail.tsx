/**
 * @file ProjectReportDetail.tsx
 * @description Comprehensive Project Report Detail Component with Analytics
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { calculateProjectCompletion, stringToColor } from '../../tasks/utils/task.utils';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';

interface ProjectReportDetailProps {
    projectId: string;
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

export const ProjectReportDetail = ({ projectId }: ProjectReportDetailProps) => {
    const { projects } = useProjectStore();

    const project = useMemo(() => {
        return projects.find(p => p.id === projectId);
    }, [projects, projectId]);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    const completion = calculateProjectCompletion(project);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header with Back Button */}
            <div className="mb-6">
                <Link href="/reports" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Reports
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Project Reports</h1>
                        <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                            <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                            <span className="text-gray-400">›</span>
                            <Link href="/reports" className="text-green-600 hover:underline">Project Report</Link>
                            <span className="text-gray-400">›</span>
                            <span className="text-gray-900">{project.name}</span>
                        </nav>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column - Project Info and Charts */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Overview</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Project Name:</p>
                                <p className="text-lg font-semibold text-gray-900">{project.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Project Status:</p>
                                <div className="mt-1">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${PROJECT_STATUS_COLORS[project.status]}`}>
                                        {PROJECT_STATUS_LABELS[project.status]}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Start Date:</p>
                                <p className="text-lg font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">End Date:</p>
                                <p className="text-lg font-semibold text-gray-900">{new Date(project.endDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Members:</p>
                                <p className="text-lg font-semibold text-gray-900">{project.members?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completion:</p>
                                <p className="text-lg font-semibold text-gray-900">{completion}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Completion Progress Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Progress</h3>
                        <div className="flex items-center justify-center py-8">
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    {/* Background circle */}
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                    {/* Progress circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke={completion < 50 ? '#ef4444' : completion < 80 ? '#eab308' : '#22c55e'}
                                        strokeWidth="10"
                                        strokeDasharray={`${(completion / 100) * 283.185} 283.185`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-4xl font-bold text-gray-900">{completion}%</div>
                                    <div className="text-sm text-gray-600">Progress</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Additional Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Milestone Progress</h3>
                    <div className="flex items-center justify-center py-12">
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="8"
                                    strokeDasharray={`${(completion / 100) * 283.185} 283.185`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold text-gray-900">{completion}%</div>
                                <div className="text-xs text-gray-600 text-center">Progress</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Task Priority Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Task Priority</h3>
                    <div className="flex justify-center py-8">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">No task priority data available</div>
                        </div>
                    </div>
                </div>

                {/* Task Status Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Task Status</h3>
                    <div className="flex justify-center py-8">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">No task status data available</div>
                        </div>
                    </div>
                </div>

                {/* Hours Estimation Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Hours Estimation</h3>
                    <div className="flex justify-center py-8">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">No hours estimation data available</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users and Milestones Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Users Table */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Users</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">NAME</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">ASSIGNED TASKS</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">DONE TASKS</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">LOGGED HOURS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {project.members && project.members.length > 0 ? (
                                    project.members.map((member, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                                                        style={{ backgroundColor: stringToColor(member.name) }}
                                                    >
                                                        {getInitials(member.name)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">0</td>
                                            <td className="px-4 py-3 text-gray-600">0</td>
                                            <td className="px-4 py-3 text-gray-600">0.00</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-3 text-center text-gray-600">No members assigned</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Milestones Table */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Milestones</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">NAME</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">PROGRESS</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">COST</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-center text-gray-600">No milestones data available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Tasks</h3>

                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span className="text-sm text-gray-600">entries per page</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">TASK NAME</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">MILESTONE</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">START DATE</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">END DATE</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">ASSIGNED TO</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">TOTAL LOGGED HOURS</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">PRIORITY</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">STAGE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td colSpan={8} className="px-4 py-3 text-center text-gray-600">No tasks data available</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
