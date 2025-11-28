/**
 * @file ProjectDetail.tsx
 * @description Component hiển thị chi tiết project theo design mẫu
 * @author Mebisoft Team
 * @created 2025-11-24
 */

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  UserOutlined,
  FileOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useProjectStore } from '../store/projectStore';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types';
import { MOCK_USERS } from '../data';
import { CreateProjectMemberModal } from './modal';
import {
  getActivitiesByProjectId,
  getMilestonesByProjectId,
  getAttachmentsByProjectId,
  formatDate as formatActivityDate,
  getFileIconColor,
  getMilestoneStatusColor,
  getMilestoneStatusLabel,
} from '../data';

interface ProjectDetailProps {
  projectId: string;
}

/**
 * ProjectDetail Component
 * Hiển thị chi tiết đầy đủ của 1 project theo design mẫu
 */
export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter();
  const { projects, selectedProject, setSelectedProject, getClientById } = useProjectStore();
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  // Load mock data
  const activities = getActivitiesByProjectId(projectId);
  const milestones = getMilestonesByProjectId(projectId);
  const attachments = getAttachmentsByProjectId(projectId);

  // Load project khi component mount
  useEffect(() => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  }, [projectId, projects, setSelectedProject]);

  // Handle add member
  const handleAddMember = (userId: string) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user && selectedProject) {
      const exists = selectedProject.members.some(m => m.id === userId);
      if (!exists) {
        const newMember = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        };
        const updatedProject = {
          ...selectedProject,
          members: [...selectedProject.members, newMember],
        };
        setSelectedProject(updatedProject);
      }
    }
  };

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

  return (
    <div className="min-h-screen  p-4 md:p-6">
      {/* Header: Breadcrumb and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => router.push('/dashboard')} className="hover:text-blue-600">
            Dashboard
          </button>
          <span>/</span>
          <button onClick={() => router.push('/projects')} className="hover:text-blue-600">
            Project
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {selectedProject.name}
          </span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push(`/projects/${projectId}/budget`)}
            className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1.5 text-xs"
          >
            <DollarOutlined />
            <span>Budgeting</span>
          </button>
          <button className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs">
            Tracker
          </button>
          <button className="px-3 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-xs">
            Expense
          </button>
          <button className="px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-xs">
            Timesheet
          </button>
          <button className="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-xs">
            Bug Report
          </button>
          <button className="px-3 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors text-xs">
            Task
          </button>
        </div>
      </div>


      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Total Task */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
              <FileTextOutlined className="text-xl md:text-2xl text-pink-500" />
              
              <p className="text-xs md:text-sm text-gray-600 mb-1">Total Task</p>
            </div>
            <div className="flex-1">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">0</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Done Task <span className="font-semibold">0</span></p>
            </div>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                $ {selectedProject.budget ? Number(selectedProject.budget).toLocaleString() : '0'}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <DollarOutlined className="text-xl md:text-2xl text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Total Expense</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">$ 0,00</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
              <FileTextOutlined className="text-xl md:text-2xl text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Left Column - Dashboard */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          {/* Image and Progress Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Image on the left */}
            <div className="relative w-full md:w-1/5 h-20 rounded-lg shadow-md overflow-hidden shrink-0">
              {selectedProject.imageUrl && (
                <Image
                  src={selectedProject.imageUrl}
                  alt={`Hình ảnh của dự án ${selectedProject.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              )}
            </div>
            {/* Project Name and Progress on the right */}
            <div className="flex flex-col justify-center flex-1">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">{selectedProject.name}</h2>
              <div className="flex justify-between text-xs md:text-sm mb-1">
                <span className="text-gray-600">Completed</span>
                <span className="text-gray-900 font-medium">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-gray-500">{selectedProject.description}</p>
          </div>
          {/* Project Info */}
          <div className="bg-green-500 rounded-lg p-3 md:p-4 text-white mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm">Start Date</span>
              <span className="text-xs md:text-sm">End Date</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base font-semibold">{formatDate(selectedProject.startDate)}</span>
              <span className="text-sm md:text-base font-semibold">{formatDate(selectedProject.endDate)}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-green-400">
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm">Client</span>
                <span className="text-sm md:text-base font-semibold truncate max-w-[150px]">
                  {selectedProject.clientId ? getClientById(selectedProject.clientId)?.name || 'N/A' : 'N/A'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Mid Column - 2 Stats Cards với chiều cao bằng nhau */}
        <div className="space-y-4 md:space-y-6">
          {/* Last 7 days task done */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                <CalendarOutlined className="text-white text-sm md:text-base" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Last 7 days task done</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">0</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Day Left</span>
                <span className="text-gray-900 font-medium">130/730</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Open Task</span>
                <span className="text-gray-900 font-medium">2/2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Completed Milestone</span>
                <span className="text-gray-900 font-medium">0/2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 2 Stats Cards với chiều cao bằng nhau */}
        <div className="space-y-4 md:space-y-6">
          {/* Last 7 days hours spent */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                <ClockCircleOutlined className="text-white text-sm md:text-base" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Last 7 days hours spent</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">0</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Total project time spent</span>
                <span className="text-gray-900 font-medium">0/0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-dark h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Allocated hours on task</span>
                <span className="text-gray-900 font-medium">0/0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span className="text-gray-600">User Assigned</span>
                <span className="text-gray-900 font-medium">27/27</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Members, Activity, Milestones, Attachments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Members Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Members ({selectedProject.members.length})
            </h3>
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 shrink-0"
            >
              <PlusOutlined />
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto grow">
            {selectedProject.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-medium shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role || 'Member'}</p>
                  </div>
                </div>
                <button className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white hover:bg-pink-600 shrink-0 ml-2">
                  <UserOutlined />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <HistoryOutlined className="text-lg text-gray-600" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Activity Log ({activities.length})
              </h3>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto grow">
              {activities.map((activity, index) => {
                const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
                const bgColor = bgColors[index % bgColors.length];
                const initials = activity.userName
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0`}>
                      {initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-gray-900">
                        <span className="font-semibold">{activity.userName}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

        {/* Milestones Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Milestones ({milestones.length})
            </h3>
            <button className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 shrink-0">
              <PlusOutlined />
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto grow">
            {milestones.length > 0 ? (
              milestones.map((milestone) => (
                <div key={milestone.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{milestone.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                      {getMilestoneStatusLabel(milestone.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{milestone.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarOutlined />
                    <span>Due: {formatActivityDate(milestone.dueDate)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 md:py-8">
                <p className="text-sm md:text-base text-gray-500">No Milestone Found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Attachments Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <FileOutlined className="text-lg text-gray-600" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Attachments ({attachments.length})
              </h3>
            </div>
            <button className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 shrink-0">
              <PlusOutlined />
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto grow">
            {attachments.length > 0 ? (
              attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileOutlined className={`${getFileIconColor(attachment.fileType)} shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                        {attachment.fileName}
                      </p>
                      <p className="text-xs text-gray-500">{attachment.fileSize}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 md:py-8">
                <p className="text-sm md:text-base text-gray-500">No Attachments Found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <CreateProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
        currentMembers={selectedProject.members}
      />
    </div>
  );
}
