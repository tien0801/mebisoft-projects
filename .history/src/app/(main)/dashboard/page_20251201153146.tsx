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
      <div className="mb-">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopDueProjects projects={topDueProjects} />

        <TimesheetHours />
      </div>

      {/* Top Due Tasks - Full Width */}
      <div className="mt-6">
        <TopDueTasks />
      </div>
    </div>
  );
}
