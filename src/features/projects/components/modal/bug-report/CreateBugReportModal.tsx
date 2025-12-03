'use client';

import { Calendar, Sparkles, X } from 'lucide-react';
import { BUG_PRIORITY_LABELS, BUG_STATUS_LABELS, BugPriority, BugReportFormState, BugStatus } from '../../../types';

interface CreateBugReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onOpenAi: () => void;
    formState: BugReportFormState;
    updateFormState: <Key extends keyof BugReportFormState>(key: Key, value: BugReportFormState[Key]) => void;
    assigneeOptions: string[];
    isEditing?: boolean;
}

const STATUS_OPTIONS = Object.values(BugStatus);
const PRIORITY_OPTIONS = Object.values(BugPriority);

export const CreateBugReportModal = ({
    isOpen,
    onClose,
    onSubmit,
    onOpenAi,
    formState,
    updateFormState,
    assigneeOptions,
    isEditing = false,
}: CreateBugReportModalProps) => {
    if (!isOpen) return null;

    const titleText = isEditing ? 'Update Bug' : 'Create New Bug';
    const descriptionText = isEditing ? 'Modify the details of this bug report.' : 'Capture the details of a new bug for this project.';
    const submitLabel = isEditing ? 'Save Changes' : 'Create';

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{titleText}</h2>
                        <p className="text-sm text-gray-500">{descriptionText}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form
                    className="px-6 py-6 space-y-5"
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-gray-700">
                            Title
                            <input
                                type="text"
                                value={formState.title}
                                onChange={(event) => updateFormState('title', event.target.value)}
                                placeholder="Enter Title"
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-gray-700">
                            Priority
                            <select
                                value={formState.priority}
                                onChange={(event) => updateFormState('priority', event.target.value as BugPriority)}
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                            >
                                {PRIORITY_OPTIONS.map((priority) => (
                                    <option key={priority} value={priority}>
                                        {BUG_PRIORITY_LABELS[priority]}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-gray-700">
                            Start Date
                            <div className="relative mt-1">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={formState.startDate}
                                    onChange={(event) => updateFormState('startDate', event.target.value)}
                                    className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                />
                            </div>
                        </label>
                        <label className="text-sm font-medium text-gray-700">
                            Due Date
                            <div className="relative mt-1">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={formState.dueDate}
                                    onChange={(event) => updateFormState('dueDate', event.target.value)}
                                    className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                                />
                            </div>
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-gray-700">
                            Bug Status
                            <select
                                value={formState.status}
                                onChange={(event) => updateFormState('status', event.target.value as BugStatus)}
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                            >
                                {STATUS_OPTIONS.map((status) => (
                                    <option key={status} value={status}>
                                        {BUG_STATUS_LABELS[status]}
                                    </option>
                                ))}
                            </select>
                            <span className="mt-1 block text-xs text-green-600">Create bug status here.</span>
                        </label>
                        <label className="text-sm font-medium text-gray-700">
                            Assigned To
                            <select
                                value={formState.assignedTo}
                                onChange={(event) => updateFormState('assignedTo', event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                            >
                                {assigneeOptions.map((assignee) => (
                                    <option key={assignee} value={assignee}>
                                        {assignee}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className="text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            value={formState.description}
                            onChange={(event) => updateFormState('description', event.target.value)}
                            rows={4}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                            placeholder="Enter Description"
                        />
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={onOpenAi}
                            className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                        >
                            <Sparkles className="h-4 w-4" />
                            Generate with AI
                        </button>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                                Cancel
                            </button>
                            <button type="submit" className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-700">
                                {submitLabel}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
