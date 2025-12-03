/**
 * @file Task.tsx
 * @description Component to display and manage tasks
 * @author Mebisoft Team
 * @created 2025-11-23
 */

'use client';

import { Fragment } from 'react';
import { Plus, ListChecks, Search, Paperclip, MessageSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProjectToolbar } from '../../projects/components/ProjectToolbar';
import { ProjectStatus } from '../../projects/types/project.types';
import { stringToColor, getPriorityColor } from '../utils/task.utils';
import { useTaskListController } from '../hooks/useTaskListController';

import { TaskListProps } from '../types/task-component.types';

export const TaskList = ({ projectId }: TaskListProps) => {
    const {
        projectName,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        statusFilter,
        handleStatusFilterChange,
        searchQuery,
        handleSearchChange,
        filteredAndSortedTasks,
        groupedProjects,
        tasksCount,
        filteredCount,
        expandedProjects,
        toggleProjectExpansion,
        getInitials,
    } = useTaskListController(projectId);

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
                    onStatusFilterChange={handleStatusFilterChange}
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
                        {filteredCount} of {tasksCount} tasks
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
                                    Project
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" colSpan={6}>
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groupedProjects.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                                        No tasks match the current filters.
                                    </td>
                                </tr>
                            )}
                            {groupedProjects.map((project) => {
                                const isExpanded = expandedProjects.includes(project.projectId);
                                return (
                                    <Fragment key={project.projectId}>
                                        <tr
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => toggleProjectExpansion(project.projectId)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <ChevronRight
                                                        className={`h-4 w-4 mr-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                    />
                                                    <div>
                                                        <Link
                                                            href={`/projects/${project.projectId}`}
                                                            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {project.projectName}
                                                        </Link>
                                                        <p className="text-xs text-gray-500">{project.tasks.length} {project.tasks.length === 1 ? 'task' : 'tasks'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td colSpan={6} className="px-6 py-4 text-sm text-gray-500">
                                                Click to {isExpanded ? 'hide' : 'view'} {project.tasks.length ? 'task details' : 'details'}
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-gray-100 text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
                                                <td className="px-6 py-2 pl-16">Name</td>
                                                <td className="px-6 py-2">Stage</td>
                                                <td className="px-6 py-2">Priority</td>
                                                <td className="px-6 py-2">End Date</td>
                                                <td className="px-6 py-2">Assigned To</td>
                                                <td className="px-6 py-2">Completion</td>
                                                <td className="px-6 py-2">Actions</td>
                                            </tr>
                                        )}
                                        {isExpanded && project.tasks.map((task) => (
                                            <tr key={`${project.projectId}-${task.id}`} className="bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-start space-x-3 pl-6">
                                                        <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                                                        <div>
                                                            <Link
                                                                href={`/projects/${task.projectId}/task?highlight=${task.id}`}
                                                                className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                            >
                                                                {task.name}
                                                            </Link>
                                                        </div>
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
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
