/**
 * @file ProjectReportDetail.tsx
 * @description Comprehensive Project Report Detail Component with Analytics
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';
import { stringToColor } from '../../tasks/utils/task.utils';
import { ProjectStatus, PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS } from '../types/project.types';
import { ProjectReportDetailProps } from '../types/project-component.types';
import { useProjectReportDetail } from '../hooks/useProjectReportDetail';

type PriorityLevel = 'high' | 'medium' | 'low';

const PRIORITY_COLORS: Record<PriorityLevel, string> = {
    high: 'bg-rose-400',
    medium: 'bg-amber-400',
    low: 'bg-emerald-400',
};

const STATUS_BAR_COLORS: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'bg-purple-400',
    [ProjectStatus.PREPARING]: 'bg-blue-400',
    [ProjectStatus.IN_PROGRESS]: 'bg-cyan-400',
    [ProjectStatus.ON_HOLD]: 'bg-amber-400',
    [ProjectStatus.COMPLETED]: 'bg-emerald-400',
    [ProjectStatus.CANCELLED]: 'bg-rose-400',
};

const STATUS_BADGES: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'bg-purple-100 text-purple-700',
    [ProjectStatus.PREPARING]: 'bg-blue-100 text-blue-700',
    [ProjectStatus.IN_PROGRESS]: 'bg-cyan-100 text-cyan-700',
    [ProjectStatus.ON_HOLD]: 'bg-amber-100 text-amber-700',
    [ProjectStatus.COMPLETED]: 'bg-emerald-100 text-emerald-700',
    [ProjectStatus.CANCELLED]: 'bg-rose-100 text-rose-700',
};

const STATUS_PRIORITY: Record<ProjectStatus, PriorityLevel> = {
    [ProjectStatus.PLANNING]: 'medium',
    [ProjectStatus.PREPARING]: 'medium',
    [ProjectStatus.IN_PROGRESS]: 'high',
    [ProjectStatus.ON_HOLD]: 'medium',
    [ProjectStatus.COMPLETED]: 'low',
    [ProjectStatus.CANCELLED]: 'low',
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString('en-GB') : '--');

const calculateHours = (start?: string, end?: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(`1970-01-01T${start}Z`);
    const endDate = new Date(`1970-01-01T${end}Z`);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return diff > 0 ? diff : 0;
};

export const ProjectReportDetail = ({ projectId }: ProjectReportDetailProps) => {
    const { project, completion } = useProjectReportDetail(projectId);
    const [taskSearch, setTaskSearch] = useState('');
    const [taskPageSize, setTaskPageSize] = useState(10);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    const members = project.members ?? [];
    const tasks = project.tasks ?? [];
    const trackerEntries = project.trackerEntries ?? [];

    const trackerHoursByTask = useMemo(() => {
        return trackerEntries.reduce<Record<string, number>>((acc, entry) => {
            const key = entry.taskId ?? entry.taskName;
            if (!key) return acc;
            acc[key] = (acc[key] ?? 0) + calculateHours(entry.startTime, entry.endTime);
            return acc;
        }, {});
    }, [trackerEntries]);

    const priorityCounts = useMemo(() => {
        return tasks.reduce<Record<PriorityLevel, number>>((acc, task) => {
            const level = STATUS_PRIORITY[task.status ?? ProjectStatus.PLANNING] ?? 'medium';
            acc[level] = (acc[level] ?? 0) + 1;
            return acc;
        }, { high: 0, medium: 0, low: 0 });
    }, [tasks]);

    const statusCounts = useMemo(() => {
        return tasks.reduce<Record<ProjectStatus, number>>((acc, task) => {
            const status = task.status ?? ProjectStatus.PLANNING;
            acc[status] = (acc[status] ?? 0) + 1;
            return acc;
        }, {
            [ProjectStatus.PLANNING]: 0,
            [ProjectStatus.PREPARING]: 0,
            [ProjectStatus.IN_PROGRESS]: 0,
            [ProjectStatus.ON_HOLD]: 0,
            [ProjectStatus.COMPLETED]: 0,
            [ProjectStatus.CANCELLED]: 0,
        });
    }, [tasks]);

    const totalTasks = Math.max(tasks.length, 1);
    const totalLoggedHours = useMemo(() => Object.values(trackerHoursByTask).reduce((sum, hours) => sum + hours, 0), [trackerHoursByTask]);
    const estimatedHours = Number(project.estimatedHours ?? 0) || Math.max(tasks.length * 6, 40);

    const membersWithStats = useMemo(() => {
        return members.map(member => {
            const assignedTasks = tasks.filter(task => task.assignedTo?.some(assignee => assignee.id === member.id));
            const doneTasks = assignedTasks.filter(task => task.status === ProjectStatus.COMPLETED).length;
            const loggedHours = assignedTasks.reduce((sum, task) => sum + (trackerHoursByTask[task.id] ?? 0), 0);
            return {
                ...member,
                assignedTasks: assignedTasks.length,
                doneTasks,
                loggedHours: loggedHours.toFixed(2),
            };
        });
    }, [members, tasks, trackerHoursByTask]);

    const milestoneRows = tasks.slice(0, 4);

    const filteredTasks = useMemo(() => {
        if (!taskSearch.trim()) return tasks;
        const query = taskSearch.toLowerCase();
        return tasks.filter(task =>
            task.name.toLowerCase().includes(query) ||
            task.assignedTo?.some(assignee => assignee.name.toLowerCase().includes(query))
        );
    }, [tasks, taskSearch]);

    const visibleTasks = useMemo(() => filteredTasks.slice(0, taskPageSize), [filteredTasks, taskPageSize]);

    const taskPriorityBadge = (status: ProjectStatus | undefined) => {
        const level = STATUS_PRIORITY[status ?? ProjectStatus.PLANNING] ?? 'medium';
        const labelMap: Record<PriorityLevel, string> = { high: 'High', medium: 'Medium', low: 'Low' };
        return (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${PRIORITY_COLORS[level]}`}>
                {labelMap[level]}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f6fbff] to-white">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Link href="/reportboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold">
                            <ChevronLeft className="h-4 w-4" /> Back to Reports
                        </Link>
                        <h1 className="mt-3 text-3xl font-bold text-gray-900">Project Reports</h1>
                        <nav className="mt-2 flex items-center text-sm text-gray-600">
                            <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                            <span className="mx-2 text-gray-400">›</span>
                            <Link href="/reportboard" className="text-green-600 hover:underline">Project Report</Link>
                            <span className="mx-2 text-gray-400">›</span>
                            <span className="font-semibold text-gray-900">{project.name}</span>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-green-600">
                            <Download className="h-4 w-4" /> Export
                        </button>
                    </div>
                </div>

                {/* Overview */}
                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-[32px] bg-white p-6 shadow lg:col-span-2">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                                <span className="h-8 w-1 rounded-full bg-green-500" />
                                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                            </div>
                            <span className="text-sm font-medium text-gray-500">Detailed summary</span>
                        </div>
                        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
                            <div className="flex-1 grid gap-4 text-sm md:grid-cols-2">
                                <div>
                                    <p className="text-gray-500">Project Name</p>
                                    <p className="text-lg font-semibold text-gray-900">{project.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Project Status</p>
                                    <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${PROJECT_STATUS_COLORS[project.status]}`}>
                                        {PROJECT_STATUS_LABELS[project.status]}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-gray-500">Start Date</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(project.startDate)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">End Date</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(project.endDate)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Total Members</p>
                                    <p className="text-lg font-semibold text-gray-900">{members.length}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Completion</p>
                                    <p className="text-lg font-semibold text-gray-900">{completion}%</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative h-48 w-48">
                                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#edf2f7" strokeWidth="10" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke={completion < 50 ? '#fb7185' : completion < 80 ? '#facc15' : '#22c55e'}
                                            strokeWidth="10"
                                            strokeDasharray={`${(completion / 100) * 283.185} 283.185`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-4xl font-bold text-gray-900">{completion}%</span>
                                        <span className="text-sm text-gray-500">Progress</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h2 className="text-xl font-semibold text-gray-900">Milestone Progress</h2>
                        </div>
                        <div className="mt-6 flex flex-col items-center justify-center">
                            <div className="relative h-44 w-44">
                                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#edf2f7" strokeWidth="12" strokeDasharray="141.592 141.592" strokeDashoffset="70" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#7c3aed"
                                        strokeWidth="12"
                                        strokeDasharray={`${(completion / 200) * 283.185} 283.185`}
                                        strokeDashoffset="70"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-bold text-gray-900">{completion}%</span>
                                    <span className="text-xs text-gray-500">Progress</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics */}
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Task Priority</h3>
                        </div>
                        <div className="mt-6 flex items-end justify-between">
                            {(Object.keys(PRIORITY_COLORS) as PriorityLevel[]).map(level => {
                                const count = priorityCounts[level];
                                const max = Math.max(...Object.values(priorityCounts), 1);
                                const height = ((count || 0) / max) * 120 || 4;
                                return (
                                    <div key={level} className="flex flex-1 flex-col items-center text-sm font-medium text-gray-600">
                                        <div className="relative flex h-32 w-full items-end justify-center">
                                            <div className="w-9 rounded-t-full bg-gray-100">
                                                <div className={`rounded-t-full ${PRIORITY_COLORS[level]}`} style={{ height: `${height}px` }} />
                                            </div>
                                        </div>
                                        <span className="mt-3 capitalize">{level}</span>
                                        <span className="text-base font-semibold text-gray-900">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Task Status</h3>
                        </div>
                        <div className="mt-6 space-y-4">
                            {Object.values(ProjectStatus).map(status => (
                                <div key={status}>
                                    <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                                        <span>{PROJECT_STATUS_LABELS[status]}</span>
                                        <span className="text-gray-900">{Math.round((statusCounts[status] / totalTasks) * 100)}%</span>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-gray-100">
                                        <div className={`h-full rounded-full ${STATUS_BAR_COLORS[status]}`} style={{ width: `${(statusCounts[status] / totalTasks) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Hours Estimation</h3>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                                    <span>Estimated Hours</span>
                                    <span className="text-gray-900">{estimatedHours} h</span>
                                </div>
                                <div className="mt-2 h-3 rounded-full bg-gray-100">
                                    <div className="h-full rounded-full bg-indigo-400" style={{ width: '85%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                                    <span>Logged Hours</span>
                                    <span className="text-gray-900">{totalLoggedHours.toFixed(2)} h</span>
                                </div>
                                <div className="mt-2 h-3 rounded-full bg-gray-100">
                                    <div className="h-full rounded-full bg-orange-400" style={{ width: `${Math.min((totalLoggedHours / estimatedHours) * 100, 100)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users & Milestones */}
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                        </div>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Assigned Tasks</th>
                                        <th className="px-4 py-3">Done Tasks</th>
                                        <th className="px-4 py-3">Logged Hours</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {membersWithStats.length > 0 ? (
                                        membersWithStats.map(member => (
                                            <tr key={member.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: stringToColor(member.name) }}>
                                                            {getInitials(member.name)}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{member.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{member.assignedTasks}</td>
                                                <td className="px-4 py-3 text-gray-600">{member.doneTasks}</td>
                                                <td className="px-4 py-3 text-gray-600">{member.loggedHours}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-4 text-center text-gray-500">No members assigned</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="rounded-[32px] bg-white p-6 shadow">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Milestones</h3>
                        </div>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Progress</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Start Date</th>
                                        <th className="px-4 py-3">End Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {milestoneRows.length > 0 ? (
                                        milestoneRows.map(milestone => (
                                            <tr key={milestone.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium text-gray-900">{milestone.name}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-full rounded-full bg-gray-100">
                                                            <div className="h-2 rounded-full bg-purple-400" style={{ width: `${completion}%` }} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-700">{completion}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGES[milestone.status ?? ProjectStatus.PLANNING]}`}>
                                                        {PROJECT_STATUS_LABELS[milestone.status ?? ProjectStatus.PLANNING]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{formatDate(milestone.startDate)}</td>
                                                <td className="px-4 py-3 text-gray-600">{formatDate(milestone.endDate)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-4 text-center text-gray-500">No milestones data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Tasks */}
                <div className="mt-6 rounded-[32px] bg-white p-6 shadow">
                    <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="h-8 w-1 rounded-full bg-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
                        </div>
                        <div className="flex flex-col gap-3 text-sm text-gray-500 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <span>Show</span>
                                <select
                                    value={taskPageSize}
                                    onChange={event => setTaskPageSize(Number(event.target.value))}
                                    className="rounded-lg border border-gray-200 px-3 py-2"
                                >
                                    {[10, 25, 50].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                                <span>entries per page</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Search:</span>
                                <input
                                    value={taskSearch}
                                    onChange={event => setTaskSearch(event.target.value)}
                                    placeholder="Task name, assignee..."
                                    className="rounded-lg border border-gray-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Task Name</th>
                                    <th className="px-4 py-3">Milestone</th>
                                    <th className="px-4 py-3">Start Date</th>
                                    <th className="px-4 py-3">End Date</th>
                                    <th className="px-4 py-3">Assigned To</th>
                                    <th className="px-4 py-3">Total Logged Hours</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Stage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visibleTasks.length > 0 ? (
                                    visibleTasks.map(task => (
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{task.name}</td>
                                            <td className="px-4 py-3 text-gray-600">—</td>
                                            <td className="px-4 py-3 text-gray-600">{formatDate(task.startDate)}</td>
                                            <td className="px-4 py-3 text-gray-600">{formatDate(task.endDate)}</td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <div className="flex -space-x-2">
                                                    {task.assignedTo?.length ? (
                                                        task.assignedTo.slice(0, 3).map(member => (
                                                            <div
                                                                key={member.id}
                                                                className="h-8 w-8 rounded-full border-2 border-white text-xs font-semibold text-white flex items-center justify-center"
                                                                title={member.name}
                                                                style={{ backgroundColor: stringToColor(member.name) }}
                                                            >
                                                                {getInitials(member.name)}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span>—</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{(trackerHoursByTask[task.id] ?? 0).toFixed(2)} h</td>
                                            <td className="px-4 py-3">{taskPriorityBadge(task.status)}</td>
                                            <td className="px-4 py-3">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGES[task.status ?? ProjectStatus.PLANNING]}`}>
                                                    {PROJECT_STATUS_LABELS[task.status ?? ProjectStatus.PLANNING]}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-4 text-center text-gray-500">No tasks data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
