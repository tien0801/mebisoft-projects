/**
 * @file TaskDetail.tsx
 * @description Task Detail Component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { stringToColor, getPriorityColor } from '../utils/task.utils';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../../projects/types/project.types';
import { TaskDetailProps } from '../types/task-component.types';
import { useTaskDetailController } from '../hooks/useTaskDetailController';

export const TaskDetail = ({ taskId, projectId }: TaskDetailProps) => {
    const { taskData, getInitials } = useTaskDetailController({ taskId, projectId });

    if (!taskData) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h1>
                <Link
                    href={projectId ? `/projects/${projectId}/task` : '/taskboard'}
                    className="text-blue-600 hover:underline flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Tasks
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header with Back Button */}
            <div className="mb-6">
                <Link
                    href={taskData.projectId ? `/projects/${taskData.projectId}/task` : '/taskboard'}
                    className="text-blue-600 hover:underline flex items-center gap-2 mb-4"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Tasks
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{taskData.name}</h1>
                <p className="text-gray-600 mt-2">{taskData.description}</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Task Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status and Priority */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <div className="mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${PROJECT_STATUS_COLORS[taskData.status]}`}>
                                        {PROJECT_STATUS_LABELS[taskData.status]}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Priority</label>
                                <div className="mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(taskData.priority)}`}>
                                        {taskData.priority}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Start Date</label>
                                <p className="mt-2 text-gray-900">
                                    {new Date(taskData.startDate).toLocaleDateString('en-GB', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">End Date</label>
                                <p className="mt-2 text-gray-900">
                                    {new Date(taskData.endDate).toLocaleDateString('en-GB', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Completion */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Completion Progress</h2>
                        <div className="space-y-3">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${taskData.completion < 50
                                        ? 'bg-red-500'
                                        : taskData.completion < 80
                                            ? 'bg-yellow-500'
                                            : 'bg-green-500'
                                        }`}
                                    style={{ width: `${taskData.completion}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Progress</span>
                                <span className="text-lg font-semibold text-gray-900">{taskData.completion}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Assigned Team ({taskData.assignedTo.length})</h2>
                        <div className="space-y-3">
                            {taskData.assignedTo.map((member: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div
                                        className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                                        style={{ backgroundColor: stringToColor(member.name) }}
                                    >
                                        {getInitials(member.name)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{member.name}</p>
                                        <p className="text-xs text-gray-600">{member.role || 'Team Member'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Task Name</label>
                                <p className="mt-1 text-gray-900 font-medium">{taskData.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <div className="mt-1">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${PROJECT_STATUS_COLORS[taskData.status]}`}>
                                        {PROJECT_STATUS_LABELS[taskData.status]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Priority</label>
                                <div className="mt-1">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(taskData.priority)}`}>
                                        {taskData.priority}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Completion</label>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{taskData.completion}%</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Team Members</label>
                                <p className="mt-1 text-gray-900">{taskData.assignedTo.length} members</p>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                            Edit Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
