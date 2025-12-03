/**
 * @file TimesheetView.tsx
 * @description Timesheet view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft, Clock3, Plus, Search, X } from 'lucide-react';
import { useTimesheetController } from '../hooks/useTimesheetController';
import { TimesheetViewProps } from '../types/timesheet.types';

export const TimesheetView = ({ projectId }: TimesheetViewProps) => {
    const {
        project,
        currentWeekStart,
        setCurrentWeekStart,
        weekDays,
        tableTasks,
        dailyTotals,
        taskTotals,
        totalWeekMinutes,
        formatMinutes,
        getMinutesForTaskDay,
        openTimeModal,
        closeTimeModal,
        timeModal,
        modalHours,
        modalMinutes,
        modalDescription,
        setModalHours,
        setModalMinutes,
        setModalDescription,
        saveTimesheetEntry,
        isModalOpen,
        openModal,
        closeModal,
        taskSearch,
        setTaskSearch,
        filteredTasks,
        selectedTask,
        setSelectedTask,
        setVisibleTaskIds,
        visibleTaskIds,
        timesheetValues,
        setTimesheetValues,
        HOUR_OPTIONS,
        MINUTE_OPTIONS,
    } = useTimesheetController(projectId);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Project
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <button className="px-3 py-1 rounded-lg border border-gray-200" onClick={() => setCurrentWeekStart(prev => prev.subtract(7, 'day'))}>
                            Prev
                        </button>
                        <span className="font-semibold text-gray-900">
                            {weekDays[0].format('MMM DD')} - {weekDays[6].format('MMM DD, YYYY')}
                        </span>
                        <button className="px-3 py-1 rounded-lg border border-gray-200" onClick={() => setCurrentWeekStart(prev => prev.add(7, 'day'))}>
                            Next
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                    <span className="text-gray-400">›</span>
                    <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
                    <span className="text-gray-400">›</span>
                    <Link href={`/projects/${projectId}`} className="text-green-600 hover:underline">{project.name}</Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900">Timesheet</span>
                </nav>
            </div>

            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{project.name}'s Timesheet</p>
                            <p className="text-sm text-gray-500">Week of {weekDays[0].format('MMM DD')} - {weekDays[6].format('MMM DD, YYYY')}</p>
                        </div>
                        <button
                            onClick={openModal}
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
                        >
                            <Plus className="w-4 h-4" />
                            Add Task on Timesheet
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-xs uppercase tracking-wide text-gray-500">
                                    <th className="px-4 py-3 text-left bg-gray-50">Title</th>
                                    {weekDays.map((day) => (
                                        <th key={day.toISOString()} className="px-4 py-3 text-center bg-gray-50">
                                            <div>{day.format('ddd DD MMM')}</div>
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-center bg-gray-50">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {tableTasks.map((task) => {
                                    return (
                                        <tr key={task.id}>
                                            <td className="px-4 py-3 font-medium text-gray-900">{task.name}</td>
                                            {weekDays.map((day, index) => {
                                                return (
                                                    <td key={`${task.id}-${day.toISOString()}`} className="px-2 py-2">
                                                        <button
                                                            className="w-full rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-gray-900 hover:border-green-500 focus:border-green-500 focus:outline-none"
                                                            onClick={() => openTimeModal(task, index)}
                                                            type="button"
                                                        >
                                                            {formatMinutes(getMinutesForTaskDay(task.id, day, index))}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                            <td className="px-4 py-3 text-center font-semibold text-gray-900">
                                                {formatMinutes(taskTotals.get(task.id) ?? 0)}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {!tableTasks.length && (
                                    <tr>
                                        <td colSpan={weekDays.length + 2} className="px-4 py-10 text-center text-sm text-gray-500">
                                            Chưa có task nào trong timesheet tuần này. Nhấn "Add Task on Timesheet" để thêm.
                                        </td>
                                    </tr>
                                )}

                                {!!tableTasks.length && (
                                    <tr className="bg-green-50 font-semibold text-green-900">
                                        <td className="px-4 py-3">Total</td>
                                        {weekDays.map((day, index) => (
                                            <td key={`total-${day.toISOString()}`} className="px-4 py-3 text-center">
                                                {formatMinutes(dailyTotals[index])}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-center">{formatMinutes(totalWeekMinutes)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {tableTasks.length > 0 && (
                        <div className="mt-6 flex items-center gap-2 text-base font-semibold text-gray-900">
                            <span>Time Logged :</span>
                            <span className="rounded-full bg-green-400 px-4 py-1 text-sm font-bold text-green-900 shadow">
                                {formatMinutes(totalWeekMinutes)} Hours
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Add Task on Timesheet</h2>
                                <p className="text-sm text-gray-500">Select tasks from the project to log time quickly.</p>
                            </div>
                            <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={taskSearch}
                                    onChange={(event) => setTaskSearch(event.target.value)}
                                    placeholder="Search tasks"
                                    className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredTasks.map(task => (
                                <label key={task.id} className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">{task.name}</p>
                                        <p className="text-xs text-gray-500">Assigned: {task.assignedTo?.map(member => member.name).join(', ') || 'Unassigned'}</p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="timesheet-task"
                                        checked={selectedTask?.id === task.id}
                                        onChange={() => setSelectedTask(task)}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                                    />
                                </label>
                            ))}
                            {!filteredTasks.length && (
                                <p className="py-6 text-center text-sm text-gray-500">Đã thêm tất cả task của dự án vào timesheet tuần này.</p>
                            )}
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm" onClick={closeModal}>Cancel</button>
                            <button
                                disabled={!selectedTask}
                                onClick={() => {
                                    if (!selectedTask) return;
                                    setVisibleTaskIds((prev: string[]) => prev.includes(selectedTask.id) ? prev : [...prev, selectedTask.id]);
                                    setTimesheetValues(prev => ({
                                        ...prev,
                                        [selectedTask.id]: prev[selectedTask.id] ?? {},
                                    }));
                                    closeModal();
                                }}
                                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                            >
                                <Clock3 className="w-4 h-4" />
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {timeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Create Timesheet ({weekDays[timeModal.dayIndex].format('ddd, MMM DD YYYY')})</h3>
                                <p className="text-sm text-gray-500">{project.name} · {timeModal.task.name}</p>
                            </div>
                            <button onClick={closeTimeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-medium text-gray-700">
                                Hours
                                <select
                                    value={modalHours}
                                    onChange={(event) => setModalHours(event.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                                >
                                    {HOUR_OPTIONS.map((hour) => (
                                        <option key={hour} value={hour}>{hour}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="text-sm font-medium text-gray-700">
                                Minutes
                                <select
                                    value={modalMinutes}
                                    onChange={(event) => setModalMinutes(event.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                                >
                                    {MINUTE_OPTIONS.map((minute) => (
                                        <option key={minute} value={minute}>{minute}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className="mt-4 block text-sm font-medium text-gray-700">
                            Description
                            <textarea
                                value={modalDescription}
                                onChange={(event) => setModalDescription(event.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                                placeholder="Add notes for this time entry"
                            />
                        </label>

                        <p className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                            <Clock3 className="h-4 w-4" />
                            Total time on this task this week: <span className="font-semibold text-gray-900">{formatMinutes(taskTotals.get(timeModal.task.id) ?? 0)}</span>
                        </p>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button onClick={closeTimeModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">Cancel</button>
                            <button onClick={saveTimesheetEntry} className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
