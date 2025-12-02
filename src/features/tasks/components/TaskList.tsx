/**
 * @file Task.tsx
 * @description Component to display and manage tasks
 * @author Mebisoft Team
 * @created 2025-11-23
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, ListChecks, Search, Paperclip, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useProjectStore } from '../../projects/store/projectStore';
import { ProjectToolbar } from '../../projects/components/ProjectToolbar';
import { useTaskStore } from '../store/taskStore';
import { useTasks } from '../hooks/useTasks';
import { Task, ViewMode, SortOption } from '../types/task.types';
import { ProjectStatus } from '../../projects/types/project.types';
import {
    stringToColor,
    getPriorityColor
} from '../utils/task.utils';

export const TaskList = () => {
    const { selectedProject } = useProjectStore();
    const tasks = useTasks();
    const {
        viewMode, setViewMode,
        sortBy, setSortBy,
        statusFilter, setStatusFilter,
        searchQuery, setSearchQuery
    } = useTaskStore();

    useEffect(() => {
        // You might want to initialize tasks in the store here
        // For now, we are deriving them directly in the component
    }, [tasks]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredAndSortedTasks = useMemo(() => {
        let filteredTasks = [...tasks];

        if (statusFilter && statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter((task: Task) => task.stage === statusFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filteredTasks = filteredTasks.filter((task: Task) => {
                const matchesName = task.name.toLowerCase().includes(query);
                const matchesAssignee = task.assignedTo?.some(
                    (user: { name: string }) => user?.name?.toLowerCase().includes(query)
                );
                return matchesName || matchesAssignee;
            });
        }

        return [...filteredTasks].sort((a: Task, b: Task) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
                case 'oldest':
                    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
                case 'a-z':
                    return a.name.localeCompare(b.name);
                case 'z-a':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }, [tasks, statusFilter, searchQuery, sortBy]);

    const projectName = selectedProject?.name || 'Project Tasks';

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{projectName}</h1>
                <nav className="flex mb-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-sm font-medium text-gray-500">Project</span>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-sm font-medium text-gray-700">Tasks</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <ProjectToolbar
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    statusFilter={statusFilter}
                    onStatusFilterChange={(newStatus) => setStatusFilter(newStatus as ProjectStatus | 'all')}
                    onCreateClick={() => {
                        console.log('Create new task');
                    }}
                />

                <div className="mt-4 relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                        {filteredAndSortedTasks.length} of {tasks.length} tasks
                    </div>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                        <ListChecks className="w-4 h-4" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stage
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    End Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Assigned To
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                                    Completion
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAndSortedTasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <Link href={`/projects/${task.projectId}/tasks/${task.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                                {task.name}
                                            </Link>
                                            <p className="text-xs text-gray-500 mt-1">{task.projectName}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.stage === ProjectStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' :
                                            task.stage === ProjectStatus.PLANNING ? 'bg-gray-100 text-gray-800' :
                                                task.stage === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'}`}>
                                            {task.stage.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(task.endDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {task.assignedTo.map((user: { name: string; avatar?: string }, idx: number) => {
                                                const getInitials = (name: string) => {
                                                    return name
                                                        .split(' ')
                                                        .map(part => part[0])
                                                        .join('')
                                                        .toUpperCase()
                                                        .substring(0, 2);
                                                };
                                                const initials = user.name === 'Unassigned' ? 'U' : getInitials(user.name);
                                                return (
                                                    <div key={idx} className="relative">
                                                        <div
                                                            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 overflow-hidden border border-gray-200"
                                                            style={{
                                                                backgroundColor: stringToColor(user.name)
                                                            }}
                                                        >
                                                            <span className="text-xs font-medium">{initials}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-full mr-2">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full ${task.completion < 50 ? 'bg-red-500' :
                                                            task.completion < 80 ? 'bg-yellow-500' :
                                                                'bg-green-500'}`}
                                                        style={{ width: `${task.completion}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">{task.completion}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-gray-400">
                                                <Paperclip className="h-4 w-4 mr-1" />
                                                <span className="text-xs">0</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                <span className="text-xs">0</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <ListChecks className="h-4 w-4 mr-1" />
                                                <span className="text-xs">0/0</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
