/**
 * @file ExpenseView.tsx
 * @description Expense view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft, Plus, Search, Trash2, Pencil, Paperclip, X } from 'lucide-react';
import { ExpenseViewProps } from '../types/expense.types';
import { useExpenseViewController } from '../hooks/useExpenseViewController';

export const ExpenseView = ({ projectId }: ExpenseViewProps) => {
    const {
        project,
        projectTasks,
        currencyFormatter,
        formatDisplayDate,
        filteredExpenses,
        visibleExpenses,
        showingStart,
        showingEnd,
        isModalOpen,
        formState,
        searchTerm,
        pageSize,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handleAttachmentChange,
        handleDeleteExpense,
        handleSubmit,
        setSearchTerm,
        setPageSize,
    } = useExpenseViewController(projectId);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Project
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                    <span className="text-gray-400">›</span>
                    <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
                    <span className="text-gray-400">›</span>
                    <Link href={`/projects/${projectId}`} className="text-green-600 hover:underline">{project.name}</Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900">Expense</span>
                </nav>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Dashboard &gt; Project &gt; {project.name}</p>
                            <h2 className="text-2xl font-semibold text-gray-900">Dashboard UI&apos;s Expenses</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleOpenModal}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
                                aria-label="Add expense"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <label htmlFor="entries" className="font-medium">
                                Entries per page
                            </label>
                            <select
                                id="entries"
                                value={pageSize}
                                onChange={event => setPageSize(Number(event.target.value))}
                                className="rounded-xl border border-gray-200 px-3 py-2 text-gray-700 focus:border-green-500 focus:outline-none"
                            >
                                {[10, 25, 50].map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative w-full lg:max-w-xs">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-green-500 focus:bg-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Attachment</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3 text-right">Amount</th>
                                    <th className="px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {visibleExpenses.length ? (
                                    visibleExpenses.map(expense => (
                                        <tr key={expense.id} className="hover:bg-gray-50/80">
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {expense.attachments.length ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {expense.attachments.map(attachment => (
                                                            <span
                                                                key={attachment.id}
                                                                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                                            >
                                                                <Paperclip className="h-3 w-3" />
                                                                {attachment.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">{expense.name}</p>
                                                {expense.description && (
                                                    <p className="text-xs text-gray-500">{expense.description}</p>
                                                )}
                                                {expense.taskName && (
                                                    <p className="text-xs text-green-600">Task: {expense.taskName}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{formatDisplayDate(expense.date)}</td>
                                            <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                                {currencyFormatter.format(expense.amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-green-500 hover:text-green-600"
                                                        aria-label="Edit expense"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteExpense(expense.id)}
                                                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-red-500 hover:text-red-600"
                                                        aria-label="Delete expense"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                            No expenses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                        <p>
                            Showing {showingStart} to {showingEnd} of {filteredExpenses.length} entries
                        </p>
                        <p className="text-xs text-gray-400">Project: {project.name}</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Create Expense</h3>
                                <p className="text-sm text-gray-500">Add a new cost entry for this project.</p>
                            </div>
                            <button onClick={handleCloseModal} className="text-gray-400 transition hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Name
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={event => handleFormChange('name', event.target.value)}
                                        placeholder="Enter name"
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
                                        required
                                    />
                                </label>
                                <label className="text-sm font-medium text-gray-700">
                                    Task
                                    <select
                                        value={formState.taskId}
                                        onChange={event => handleFormChange('taskId', event.target.value)}
                                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
                                    >
                                        <option value="">Choose Task</option>
                                        {projectTasks.map(task => (
                                            <option key={task.id} value={task.id}>
                                                {task.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Recording Date
                                    <input
                                        type="date"
                                        value={formState.date}
                                        onChange={event => handleFormChange('date', event.target.value)}
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
                                        required
                                    />
                                </label>
                                <label className="text-sm font-medium text-gray-700">
                                    Amount
                                    <div className="mt-2 flex rounded-xl border border-gray-200">
                                        <span className="flex items-center border-r border-gray-200 px-3 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formState.amount}
                                            onChange={event => handleFormChange('amount', event.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full rounded-r-xl px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </label>
                            </div>
                            <label className="text-sm font-medium text-gray-700">
                                Description
                                <textarea
                                    value={formState.description}
                                    onChange={event => handleFormChange('description', event.target.value)}
                                    rows={3}
                                    placeholder="Enter description"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
                                />
                            </label>
                            <div>
                                <p className="text-sm font-medium text-gray-700">Attachments</p>
                                <label className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 px-6 py-6 text-center text-sm text-gray-500 transition hover:border-green-400">
                                    <Paperclip className="mb-2 h-6 w-6 text-green-500" />
                                    <span>Choose files to upload</span>
                                    <input type="file" multiple className="hidden" onChange={handleAttachmentChange} />
                                </label>
                                {formState.attachments.length > 0 && (
                                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                        {formState.attachments.map(attachment => (
                                            <li key={attachment.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                                                <span className="flex items-center gap-2">
                                                    <Paperclip className="h-4 w-4 text-gray-400" />
                                                    {attachment.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="flex flex-col-reverse gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-xl border border-gray-200 px-6 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
