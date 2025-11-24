/**
 * @file ProjectDetail.tsx
 * @description Component hiển thị chi tiết project theo design mẫu
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useProjectStore } from '../store/projectStore';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';

interface ProjectDetailProps {
  projectId: string;
}

/**
 * ProjectDetail Component
 * Hiển thị chi tiết đầy đủ của 1 project theo design mẫu
 */
export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter();
  const { projects, selectedProject, setSelectedProject } = useProjectStore();

  // Load project khi component mount
  useEffect(() => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  }, [projectId, projects, setSelectedProject]);

  // Nếu chưa load xong
  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Tính số ngày còn lại
  const calculateDaysLeft = () => {
    const today = new Date();
    const endDate = new Date(selectedProject.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/dashboard')}
            className="hover:text-blue-600"
          >
            Dashboard
          </button>
          <span>/</span>
          <button
            onClick={() => router.push('/dashboard')}
            className="hover:text-blue-600"
          >
            Project
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{selectedProject.name}</span>
        </div>
      </div>

      {/* Header với tên project */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon project */}
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {selectedProject.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h1>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase mt-2 ${
                  PROJECT_STATUS_COLORS[selectedProject.status]
                }`}
              >
                {PROJECT_STATUS_LABELS[selectedProject.status]}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
              <PlusOutlined />
              <span>Gantt Chart</span>
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Tracker
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
              Expense
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Timesheet
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Bug Report
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
              Task
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Total Task */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Task</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500 mt-1">Done Task <span className="font-semibold">0</span></p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <FileTextOutlined className="text-2xl text-pink-500" />
            </div>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">$ 123,00</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarOutlined className="text-2xl text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expense</p>
              <p className="text-3xl font-bold text-gray-900">$ 0,00</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileTextOutlined className="text-2xl text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Dashboard */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard {selectedProject.name}</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completed</span>
              <span className="text-gray-900 font-medium">0%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-green-500 rounded-lg p-4 text-white mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Start Date</span>
              <span className="text-sm">End Date</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{formatDate(selectedProject.startDate)}</span>
              <span className="font-semibold">{formatDate(selectedProject.endDate)}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-green-400">
              <div className="flex justify-between items-center">
                <span className="text-sm">Project</span>
                <span className="font-semibold">{selectedProject.name}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CalendarOutlined className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Last 7 days task done</p>
                  <p className="text-xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Day Left</span>
                <span className="text-gray-900 font-medium">0/0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Open Task</span>
                <span className="text-gray-900 font-medium">0/0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completed Milestone</span>
                <span className="text-gray-900 font-medium">0/0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Task Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <ClockCircleOutlined className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Last 7 days hours spent</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total project time spent</span>
              <span className="text-gray-900 font-medium">0/0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Allocated hours on task</span>
              <span className="text-gray-900 font-medium">0/0</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">User Assigned</span>
              <span className="text-gray-900 font-medium">27/27</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Right Column - Members & Milestones */}
        <div className="space-y-6">
          {/* Members */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Members</h3>
              <button className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600">
                <PlusOutlined />
              </button>
            </div>
            <div className="space-y-3">
              {selectedProject.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role || 'Member'}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white hover:bg-pink-600">
                    <UserOutlined />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Milestones (0)</h3>
              <button className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600">
                <PlusOutlined />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500">No Milestone Found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
