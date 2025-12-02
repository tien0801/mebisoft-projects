/**
 * @file page.tsx
 * @description Dashboard page - Tổng quan dự án và nhiệm vụ
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useAuth } from '@/features/auth';
import { useProjectStore } from '@/features/projects';
import { ProjectStatus, PROJECT_STATUS_LABELS } from '@/features/projects/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects } = useProjectStore();

  // Tính toán thống kê
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === ProjectStatus.COMPLETED).length;
  const inProgressProjects = projects.filter((p) => p.status === ProjectStatus.IN_PROGRESS).length;
  const onHoldProjects = projects.filter((p) => p.status === ProjectStatus.ON_HOLD).length;
  const cancelledProjects = projects.filter((p) => p.status === ProjectStatus.CANCELLED).length;

  const completedPercent = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
  const inProgressPercent = totalProjects > 0 ? Math.round((inProgressProjects / totalProjects) * 100) : 0;

  // Mock data cho tasks
  const totalTasks = 46;
  const completedTasks = 13;
  const completedTasksPercent = Math.round((completedTasks / totalTasks) * 100);

  // Mock data cho expense
  const totalExpense = 5;
  const expensePercent = 17;

  // Top Due Projects (sắp xếp theo endDate gần nhất)
  const topDueProjects = [...projects]
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 5);

  // Mock data cho timesheet
  const timesheetData = [
    { name: 'Sun', hours: 8 },
    { name: 'Mon', hours: 9.5 },
    { name: 'Tue', hours: 7 },
    { name: 'Wed', hours: 8.5 },
    { name: 'Thu', hours: 8 },
    { name: 'Fri', hours: 9 },
    { name: 'Sat', hours: 3 },
  ];

  const maxHours = Math.max(...timesheetData.map((d) => d.hours));

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Get status color
  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      [ProjectStatus.PLANNING]: 'bg-purple-500',
      [ProjectStatus.PREPARING]: 'bg-blue-500',
      [ProjectStatus.IN_PROGRESS]: 'bg-cyan-500',
      [ProjectStatus.ON_HOLD]: 'bg-yellow-500',
      [ProjectStatus.COMPLETED]: 'bg-green-500',
      [ProjectStatus.CANCELLED]: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="p-4 md:p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Project</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Total Projects */}
        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-pink-600">{completedPercent}%</span>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          {/* Wave decoration */}
          <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
            <svg viewBox="0 0 100 50" className="w-full h-full text-pink-500">
              <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Total Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-600">{completedTasksPercent}%</span>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          {/* Wave decoration */}
          <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
            <svg viewBox="0 0 100 50" className="w-full h-full text-green-500">
              <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expense</p>
              <p className="text-3xl font-bold text-gray-900">{totalExpense}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-orange-600">{expensePercent}%</span>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          {/* Wave decoration */}
          <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
            <svg viewBox="0 0 100 50" className="w-full h-full text-orange-500">
              <path d="M0,25 Q25,0 50,25 T100,25 L100,50 L0,50 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Project Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h2>
          <div className="space-y-4">
            {/* In Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-semibold text-gray-900">{inProgressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${inProgressPercent}%` }}></div>
              </div>
            </div>

            {/* On Hold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">On Hold</span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalProjects > 0 ? Math.round((onHoldProjects / totalProjects) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${totalProjects > 0 ? (onHoldProjects / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Completed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-semibold text-gray-900">{completedPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completedPercent}%` }}></div>
              </div>
            </div>

            {/* Cancelled */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalProjects > 0 ? Math.round((cancelledProjects / totalProjects) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${totalProjects > 0 ? (cancelledProjects / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Overview - Area Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tasks Overview</h2>
            <span className="text-xs text-gray-500">Total Completed tasks in last 7 days</span>
          </div>
          <div className="h-64 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            {/* Chart area */}
            <div className="ml-8 h-full pb-8 relative">
              <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="700" y2="0" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="40" x2="700" y2="40" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="80" x2="700" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="120" x2="700" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="200" x2="700" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Area fill */}
                <path
                  d="M 0 120 L 100 100 L 200 80 L 300 110 L 400 70 L 500 90 L 600 60 L 700 85 L 700 200 L 0 200 Z"
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                
                {/* Line */}
                <path
                  d="M 0 120 L 100 100 L 200 80 L 300 110 L 400 70 L 500 90 L 600 60 L 700 85"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>14 May</span>
                <span>15 May</span>
                <span>16 May</span>
                <span>17 May</span>
                <span>18 May</span>
                <span>19 May</span>
                <span>20 May</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Due Projects */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Due Projects</h2>
            <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topDueProjects.slice(0, 3).length > 0 ? (
              topDueProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                      {project.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{project.name}</p>
                      <p className="text-xs text-gray-500">
                        {project.budget ? `$ ${Number(project.budget).toLocaleString()}` : 'No budget'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(project.endDate)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No projects found</div>
            )}
          </div>
        </div>

        {/* Project System - Quick Access */}

        {/* Timesheet Logged Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Timesheet Logged Hours</h2>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {timesheetData.map((day) => (
              <div key={day.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{day.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(day.hours / maxHours) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{day.hours}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Due Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Due Tasks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 pb-3">Task</th>
                  <th className="text-left text-xs font-medium text-gray-500 pb-3">Project</th>
                  <th className="text-left text-xs font-medium text-gray-500 pb-3">Stage</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-3">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="text-sm text-gray-900">Finish the logo design</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-gray-600">Website Builder</p>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-600">Low</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">0%</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="text-sm text-gray-900">Define users and workflow</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-gray-600">Website Launch</p>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-600">High</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">0%</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="text-sm text-gray-900">Design Approval</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-gray-600">Website Builder</p>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-600">High</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">0%</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="text-sm text-gray-900">Identify event sources</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-gray-600">Website Launch</p>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">Medium</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">0%</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <p className="text-sm text-gray-900">Dashboard Issues</p>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-gray-600">Website Launch</p>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-gray-600">Critical</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">0%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
