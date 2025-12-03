'use client';

import Link from 'next/link';
import {
    Calendar,
    MessageSquare,
    MoreVertical,
    Paperclip,
    Plus
} from 'lucide-react';
import { getPriorityColor, stringToColor } from '../utils/task.utils';
import { PROJECT_STATUS_LABELS } from '../../projects/types/project.types';
import { TaskBoardProps } from '../types/task-component.types';
import { useTaskBoardController, getColumnFromStatus } from '../hooks/useTaskBoardController';

export const TaskBoard = ({ projectId }: TaskBoardProps) => {
    const {
        project,
        columns,
        highlightedTask,
        columnConfigMap,
        draggingTaskId,
        activeHighlightId,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDragEnd,
    } = useTaskBoardController(projectId);

    if (!project) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                    <p className="text-lg font-semibold text-gray-900">Project not found</p>
                    <p className="text-sm text-gray-500 mt-2">Please return to the project list and try again.</p>
                    <Link
                        href="/projects"
                        className="inline-flex mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                    >
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{project.name}'s Tasks</h1>
                        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
                            <ol className="flex items-center gap-2">
                                <li>
                                    <Link href="/dashboard" className="hover:text-blue-600">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                <li>
                                    <Link href="/projects" className="hover:text-blue-600">
                                        Project
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                <li>
                                    <Link
                                        href={`/projects/${projectId}`}
                                        className="hover:text-blue-600"
                                    >
                                        {project.name}
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                <li className="text-gray-700 font-medium">Task</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Plus className="w-4 h-4" />
                            New Task
                        </button>
                    </div>
                </div>

                {highlightedTask && (
                    <div className="p-4 rounded-2xl border border-lime-200 bg-lime-50 flex flex-wrap items-center gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-lime-700 font-semibold">Currently viewing</p>
                            <p className="text-sm font-medium text-gray-900">{highlightedTask.name}</p>
                            <p className="text-xs text-gray-500">
                                Column:
                                {' '}
                                <span className="font-semibold text-gray-700">
                                    {columnConfigMap[getColumnFromStatus(highlightedTask.stage)].title}
                                </span>
                            </p>
                        </div>
                        <Link
                            href={`/projects/${projectId}/task/${highlightedTask.id}`}
                            className="ml-auto inline-flex items-center text-sm font-medium text-lime-700 hover:text-lime-900"
                        >
                            View details
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {columns.map(({ key, config, tasks }) => (
                    <div
                        key={key}
                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col ${config.accentColor}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop(key)}
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold text-gray-900">{config.title}</div>
                                <div className="text-xs text-gray-400">{tasks.length} Task{tasks.length !== 1 ? 's' : ''}</div>
                            </div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeColor}`}>
                                {tasks.length}
                            </span>
                        </div>
                        <div className="p-4 flex-1 space-y-4 min-h-[200px]">
                            {tasks.length === 0 && (
                                <div className="text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg py-6">
                                    Drag tasks here
                                </div>
                            )}
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    id={`task-card-${task.id}`}
                                    draggable
                                    onDragStart={handleDragStart(task.id)}
                                    onDragEnd={handleDragEnd}
                                    className={`rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition p-4 space-y-3 cursor-move ${draggingTaskId === task.id ? 'ring-2 ring-blue-200' : ''} ${activeHighlightId === task.id ? 'ring-4 ring-lime-300 border-lime-300 shadow-lg' : ''}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <Link
                                                href={`/projects/${task.projectId}/task/${task.id}`}
                                                className="font-semibold text-gray-900 hover:text-blue-600"
                                            >
                                                {task.name}
                                            </Link>
                                            <p className="text-xs text-gray-400 mt-1">{PROJECT_STATUS_LABELS[task.stage]}</p>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                        <span className="text-[11px] text-gray-500">Due {new Date(task.endDate).toLocaleDateString('en-GB')}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Paperclip className="w-3.5 h-3.5" />
                                            <span>0</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>0</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(task.startDate).toLocaleDateString('en-GB')}</span>
                                        </div>
                                    </div>

                                    <div className="flex -space-x-2">
                                        {task.assignedTo.map((member, index) => (
                                            <div
                                                key={`${member.name}-${index}`}
                                                className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white"
                                                style={{ backgroundColor: stringToColor(member.name) }}
                                            >
                                                {member.name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
                                            </div>
                                        ))}
                                        {task.assignedTo.length === 0 && (
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                                                +
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};