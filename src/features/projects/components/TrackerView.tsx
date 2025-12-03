/**
 * @file TrackerView.tsx
 * @description Tracker view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft, Eye, Search, Trash2 } from 'lucide-react';
import { TrackerViewProps } from '../types/project-component.types';
import { useTrackerViewController } from '../hooks/useTrackerViewController';

export const TrackerView = ({ projectId }: TrackerViewProps) => {
    const {
        project,
        search,
        setSearch,
        perPage,
        setPerPage,
        currentPage,
        setCurrentPage,
        paginatedEntries,
        filteredEntries,
        totalPages,
        showingFrom,
        showingTo,
        formatDuration,
    } = useTrackerViewController(projectId);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white/90 backdrop-blur">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Project
                        </Link>
                    </div>

                    <h1 className="text-3xl font-semibold text-gray-900">Manage Tracker</h1>
                    <nav className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/dashboard" className="text-green-600 hover:underline transition">Dashboard</Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-900">Tracker</span>
                    </nav>
                </div>
            </div>

            <div className="p-6">
                <div className="rounded-2xl bg-white p-6 shadow">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-gray-900">Tracker</p>
                            <p className="text-sm text-gray-500">Project: {project.name}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <label htmlFor="per-page" className="text-gray-500">Entries per page</label>
                                <select
                                    id="per-page"
                                    value={perPage}
                                    onChange={(event) => setPerPage(Number(event.target.value))}
                                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                                >
                                    {[5, 10, 25, 50].map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search..."
                                    className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                            <thead>
                                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    {['Description', 'Task', 'Project', 'Start Time', 'End Time', 'Total Time', 'Action'].map((header) => (
                                        <th key={header} className="bg-gray-50 px-4 py-3">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {paginatedEntries.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                                            Không có bản ghi tracker nào phù hợp.
                                        </td>
                                    </tr>
                                )}

                                {paginatedEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{entry.description}</td>
                                        <td className="px-4 py-3">{entry.taskName}</td>
                                        <td className="px-4 py-3">{project.name}</td>
                                        <td className="px-4 py-3">{entry.startTime}</td>
                                        <td className="px-4 py-3">{entry.endTime}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">{formatDuration(entry)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button className="rounded-full bg-green-50 p-2 text-green-600 shadow-sm transition hover:bg-green-100" aria-label="View tracker entry">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="rounded-full bg-pink-50 p-2 text-pink-500 shadow-sm transition hover:bg-pink-100" aria-label="Delete tracker entry">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
                        <p>
                            {filteredEntries.length
                                ? `Showing ${showingFrom} to ${showingTo} of ${filteredEntries.length} entries`
                                : 'Không có bản ghi nào'}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 disabled:opacity-40"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                            >
                                Previous
                            </button>
                            <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
                            <button
                                className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 disabled:opacity-40"
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
