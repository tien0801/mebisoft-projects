/**
 * @file ProjectDetail.tsx
 * @description Comprehensive Project Detail Dashboard Component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Share2, Edit3, Calendar, DollarSign, Clock } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { calculateProjectCompletion, stringToColor } from '../../tasks/utils/task.utils';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types/project.types';

interface ProjectDetailProps {
  projectId: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const { projects } = useProjectStore();
  const [activeTab, setActiveTab] = useState<'gantt' | 'tracker' | 'expense' | 'timesheet' | 'bug' | 'task'>('gantt');

  const project = useMemo(() => {
    return projects.find(p => p.id === projectId);
  }, [projects, projectId]);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
      </div>
    );
  }

  const completion = calculateProjectCompletion(project);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <ChevronLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg">
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                <span className="text-gray-400">›</span>
                <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900">{project.name}</span>
              </nav>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {[
              { key: 'gantt', label: 'Gantt Chart', color: 'bg-green-500' },
              { key: 'tracker', label: 'Tracker', color: 'bg-blue-500' },
              { key: 'expense', label: 'Expense', color: 'bg-teal-500' },
              { key: 'timesheet', label: 'Timesheet', color: 'bg-blue-600' },
              { key: 'bug', label: 'Bug Report', color: 'bg-green-600' },
              { key: 'task', label: 'Task', color: 'bg-gray-500' }
            ].map(tab => (
              <Link
                key={tab.key}
                href={`/projects/${projectId}/${tab.key}`}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab.key
                  ? `${tab.color} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tab.label}
              </Link>
            ))}
            <button className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-400 text-white hover:bg-blue-500 transition ml-auto">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Task Card */}
          <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Task</p>
                <p className="text-3xl font-bold text-gray-900">7</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Done Task</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full -mr-12 -mb-12 opacity-50"></div>
          </div>

          {/* Total Budget Card */}
          <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-sm text-gray-600">Budget</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">$ 2.000,00</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 rounded-full -mr-12 -mb-12 opacity-30"></div>
          </div>

          {/* Total Expense Card */}
          <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-sm text-gray-600">Expense</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">$ 100,00</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-200 rounded-full -mr-12 -mb-12 opacity-30"></div>
          </div>
        </div>

        {/* Project Info and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Project Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(project.name)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">
                  Completed: <span className="font-semibold text-gray-900">{completion}%</span>
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className={`h-2 rounded-full ${completion < 50 ? 'bg-red-500' : completion < 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 line-clamp-3">{project.description}</p>

            <div className="bg-green-500 text-white rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Start Date</span>
                <span className="font-bold">{new Date(project.startDate).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">End Date</span>
                <span className="font-bold">{new Date(project.endDate).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-400">
                <span className="text-sm">Client</span>
                <span className="font-bold">
                  {project.members?.[0]?.name || 'Not assigned'}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { icon: Calendar, label: 'Last 7 days task done', value: '0', color: 'bg-green-100' },
              { icon: Clock, label: 'Last 7 days hours spent', value: '8', color: 'bg-green-100' },
              { icon: Calendar, label: 'Day Left', value: '1,677/86', color: 'bg-blue-100', subtext: true },
              { icon: Calendar, label: 'Open Task', value: '5/7', color: 'bg-blue-100', subtext: true },
              { icon: Calendar, label: 'Completed Milestone', value: '1/4', color: 'bg-blue-100', subtext: true },
              { icon: Clock, label: 'Total project time spent', value: '81/81', color: 'bg-green-100', subtext: true }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start gap-3">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members and Milestones Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Members</h3>
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {project.members && project.members.length > 0 ? (
                project.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                        style={{ backgroundColor: stringToColor(member.name) }}
                      >
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role || 'Team Member'}</p>
                      </div>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No members assigned</p>
              )}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Milestones ({project.members?.length || 0})</h3>
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Hiring Individual Positions', tasks: 16, status: 'Complete', color: 'bg-green-100', statusColor: 'bg-green-500' },
                { name: 'Communication Updates', tasks: 32, status: 'In Progress', color: 'bg-blue-100', statusColor: 'bg-blue-500' },
                { name: 'Design Approval', tasks: 0, status: 'On Hold', color: 'bg-orange-100', statusColor: 'bg-orange-500' },
                { name: 'Communication Updates', tasks: 0, status: 'Canceled', color: 'bg-red-100', statusColor: 'bg-red-500' }
              ].map((milestone, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-xs text-gray-600">{milestone.tasks} Tasks</p>
                    </div>
                    <span className={`${milestone.statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 bg-orange-100 text-orange-600 rounded hover:bg-orange-200">
                      👁
                    </button>
                    <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                      ✎
                    </button>
                    <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Log and Attachments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Log</h3>
            <p className="text-sm text-gray-600 mb-4">Activity Log of this project</p>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                { icon: '✚', action: 'Workdo Moved the Task', detail: 'The marketplace strategy', timestamp: '4 years ago' },
                { icon: '⟹', action: 'Move Task', detail: 'Workdo Moved the Task The marketplace strategy from To Do to Done', timestamp: '4 years ago' },
                { icon: '⟹', action: 'Move Task', detail: 'Workdo Moved the Task Website redesign from To Do to Done', timestamp: '4 years ago' },
                { icon: '⚠', action: 'Create Bug', detail: 'Workdo Created new bug Project1 Bug4', timestamp: '4 years ago' },
                { icon: '⚠', action: 'Create Bug', detail: 'Workdo Created new bug Project1 Bug3', timestamp: '4 years ago' },
                { icon: '⚠', action: 'Create Bug', detail: 'Workdo Created new bug Project1 Bug2', timestamp: '4 years ago' }
              ].map((log, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600 font-bold text-sm w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {log.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <p className="text-sm text-gray-600">{log.detail}</p>
                    <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
            <p className="text-sm text-gray-600 mb-4">Attachment that uploaded in this project</p>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                { name: '11594448449_download.jpeg', size: '0.01 MB' },
                { name: '11594445989_abstract-best-deals-sale-promotion-banner_44695-313.jpg', size: '0.1 MB' },
                { name: '11594445989_abstract-best-deals-sale-promotion-banner_44695-313.jpg', size: '0.1 MB' },
                { name: '41594448977_download.jpeg', size: '0.01 MB' },
                { name: '41594448981_large.jpg', size: '0.5 MB' }
              ].map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-600">{file.size}</p>
                  </div>
                  <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    ↓
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
