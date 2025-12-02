/**
 * @file page.tsx
 * @description Dashboard page - Tổng quan dự án và nhiệm vụ
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useProjectStore } from '@/features/projects';
import { ProjectStatus } from '@/features/projects/types';
import {
  StatsCards,
  ProjectStatus as ProjectStatusComponent,
  TasksOverview,
  TopDueProjects,
  ProjectSystemMenu,
  TimesheetHours,
  TopDueTasks,
} from '@/features/dashboard/components';

export default function DashboardPage() {
  const { projects } = useProjectStore();

  // Tính toán thống kê
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === ProjectStatus.COMPLETED).length;
  const inProgressProjects = projects.filter((p) => p.status === ProjectStatus.IN_PROGRESS).length;
  const onHoldProjects = projects.filter((p) => p.status === ProjectStatus.ON_HOLD).length;
  const cancelledProjects = projects.filter((p) => p.status === ProjectStatus.CANCELLED).length;

  const completedPercent = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
  const inProgressPercent = totalProjects > 0 ? Math.round((inProgressProjects / totalProjects) * 100) : 0;
  const onHoldPercent = totalProjects > 0 ? Math.round((onHoldProjects / totalProjects) * 100) : 0;
  const cancelledPercent = totalProjects > 0 ? Math.round((cancelledProjects / totalProjects) * 100) : 0;

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
    .slice(0, 3);

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
      <StatsCards
        totalProjects={totalProjects}
        completedPercent={completedPercent}
        totalTasks={totalTasks}
        completedTasksPercent={completedTasksPercent}
        totalExpense={totalExpense}
        expensePercent={expensePercent}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectStatusComponent
          inProgressPercent={inProgressPercent}
          onHoldPercent={onHoldPercent}
          completedPercent={completedPercent}
          cancelledPercent={cancelledPercent}
        />
        <TasksOverview />
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
