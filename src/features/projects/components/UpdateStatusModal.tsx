/**
 * @file UpdateStatusModal.tsx
 * @description Modal to update project status
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Project, ProjectStatus, PROJECT_STATUS_LABELS } from '../types/project.types';
import { useProjectStore } from '../store/projectStore';

interface UpdateStatusModalProps {
    project: Project;
    onClose: () => void;
    onStatusUpdated: () => void;
}

export const UpdateStatusModal = ({
    project,
    onClose,
    onStatusUpdated,
}: UpdateStatusModalProps) => {
    const [newStatus, setNewStatus] = useState<ProjectStatus>(project.status);
    const [isLoading, setIsLoading] = useState(false);
    const { projects } = useProjectStore();

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update the project status in the store
            const updatedProjects = projects.map(p =>
                p.id === project.id ? { ...p, status: newStatus } : p
            );

            // In a real app, you would call an API here
            console.log('Project status updated:', {
                projectId: project.id,
                oldStatus: project.status,
                newStatus: newStatus,
            });

            // Show success message
            alert(`Project status updated from ${PROJECT_STATUS_LABELS[project.status]} to ${PROJECT_STATUS_LABELS[newStatus]}`);
            onStatusUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Update Project Status</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Project Name</label>
                        <p className="mt-1 text-gray-900 font-medium">{project.name}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Current Status</label>
                        <p className="mt-1 text-gray-700">{PROJECT_STATUS_LABELS[project.status]}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            New Status
                        </label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-black bg-white text-black"
                        >
                            {Object.entries(PROJECT_STATUS_LABELS).map(([status, label]) => (
                                <option key={status} value={status}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {newStatus !== project.status && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                Project status will be updated from <strong>{PROJECT_STATUS_LABELS[project.status]}</strong> to <strong>{PROJECT_STATUS_LABELS[newStatus]}</strong>
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateStatus}
                        disabled={isLoading || newStatus === project.status}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Updating...' : 'Update Status'}
                    </button>
                </div>
            </div>
        </div>
    );
};
