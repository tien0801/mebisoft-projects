/**
 * @file ProjectDetailsModal.tsx
 * @description Modal to display project details
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import { X } from 'lucide-react';
import { Project, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';
import { calculateProjectCompletion, stringToColor } from '../../tasks/utils/task.utils';

interface ProjectDetailsModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectDetailsModal = ({ project, onClose }: ProjectDetailsModalProps) => {
    const completion = calculateProjectCompletion(project);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status and Completion */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            <div className="mt-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${PROJECT_STATUS_COLORS[project.status]}`}>
                                    {PROJECT_STATUS_LABELS[project.status]}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Completion</label>
                            <div className="mt-2">
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
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <p className="mt-2 text-gray-700">{project.description}</p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Start Date</label>
                            <p className="mt-2 text-gray-700">
                                {new Date(project.startDate).toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">End Date</label>
                            <p className="mt-2 text-gray-700">
                                {new Date(project.endDate).toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Members */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">Team Members ({project.members?.length || 0})</label>
                        <div className="mt-3 space-y-2">
                            {project.members?.map((member, idx) => (
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

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4">
                        {project.clientId && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Client ID</label>
                                <p className="mt-2 text-gray-700">{project.clientId}</p>
                            </div>
                        )}
                        {project.managerId && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Manager ID</label>
                                <p className="mt-2 text-gray-700">{project.managerId}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
