'use client'
import { Project, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../../types/project.types';
import { calculateProjectCompletion, stringToColor } from '../../../tasks/utils/task.utils';
import { X } from 'lucide-react';

interface ProjectDetailsModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

export const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
    if (!isOpen || !project) return null;

    const completion = calculateProjectCompletion(project);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                    </div>

                    {/* Status and Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${PROJECT_STATUS_COLORS[project.status]}`}>
                                {PROJECT_STATUS_LABELS[project.status]}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Completion</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
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
                                <span className="text-xs font-medium text-gray-700 w-8">{completion}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
                            <p className="text-sm text-gray-600">{new Date(project.startDate).toLocaleDateString('en-GB')}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">End Date</h3>
                            <p className="text-sm text-gray-600">{new Date(project.endDate).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Team Members</h3>
                        <div className="space-y-2">
                            {project.members && project.members.length > 0 ? (
                                project.members.map((member, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                        <div
                                            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                                            style={{ backgroundColor: stringToColor(member.name) }}
                                        >
                                            {getInitials(member.name)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                            <p className="text-xs text-gray-600">{member.role || 'Team Member'}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-600">No team members assigned</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
