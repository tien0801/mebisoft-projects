/**
 * @file CreateProjectModal.tsx
 * @description Modal tạo project mới - Theo thiết kế mẫu
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ProjectStatus, PROJECT_STATUS_LABELS } from '../../../types/project.types';
import { MOCK_CLIENTS, MOCK_USERS } from '../../../data/mockMember';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

export interface ProjectFormData {
  name: string;
  startDate: string;
  endDate: string;
  image?: File | string;
  client: string;
  user: string;
  budget: string;
  estimatedHours: string;
  description: string;
  tag: string;
  status: ProjectStatus;
}

export function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    startDate: '',
    endDate: '',
    client: '',
    user: '',
    budget: '',
    estimatedHours: '',
    description: '',
    tag: '',
    status: ProjectStatus.IN_PROGRESS,
  });

  const [imageFileName, setImageFileName] = useState('No file chosen');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      setFormData({ ...formData, image: file });
    }
  };

  const handleGenerateWithAI = () => {
    alert('Generate with AI - Coming soon!');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-[10000]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Generate with AI Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateWithAI}
                className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter Project Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Project Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="text-gray-700">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">{imageFileName}</span>
              </div>
            </div>

            {/* Client & User */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Client</option>
                  {MOCK_CLIENTS.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Create client here. <span className="text-green-500 cursor-pointer hover:underline">Create client</span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User<span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select User</option>
                  {MOCK_USERS.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Create user here. <span className="text-green-500 cursor-pointer hover:underline">Create user</span>
                </p>
              </div>
            </div>

            {/* Budget & Estimated Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Hours
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Estimated Hours"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <input
                type="text"
                placeholder="Enter Project Tag"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-green-400 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                {Object.values(ProjectStatus).map((status) => (
                  <option key={status} value={status}>
                    {PROJECT_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Buttons - Fixed */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
