import { Plus, Search } from 'lucide-react';
import { BUG_PRIORITY_LABELS, BUG_STATUS_LABELS, BugPriority, BugStatus } from '../../types';

interface BugReportToolbarProps {
    totalCount: number;
    statusFilter: BugStatus | 'all';
    onStatusChange: (value: BugStatus | 'all') => void;
    priorityFilter: BugPriority | 'all';
    onPriorityChange: (value: BugPriority | 'all') => void;
    searchKeyword: string;
    onSearchChange: (value: string) => void;
    onAddBug: () => void;
}

const STATUS_OPTIONS: (BugStatus | 'all')[] = ['all', ...Object.values(BugStatus)];
const PRIORITY_OPTIONS: (BugPriority | 'all')[] = ['all', ...Object.values(BugPriority)];

export const BugReportToolbar = ({
    totalCount,
    statusFilter,
    onStatusChange,
    priorityFilter,
    onPriorityChange,
    searchKeyword,
    onSearchChange,
    onAddBug,
}: BugReportToolbarProps) => {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
                <p className="text-lg font-semibold text-gray-900">Manage Bug Report</p>
                <p className="text-sm text-gray-500">Showing {totalCount} {totalCount === 1 ? 'entry' : 'entries'}</p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search..."
                        className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(event) => onStatusChange(event.target.value as BugStatus | 'all')}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option === 'all' ? 'All Status' : BUG_STATUS_LABELS[option]}
                        </option>
                    ))}
                </select>

                <select
                    value={priorityFilter}
                    onChange={(event) => onPriorityChange(event.target.value as BugPriority | 'all')}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                >
                    {PRIORITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option === 'all' ? 'All Priority' : BUG_PRIORITY_LABELS[option]}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={onAddBug}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Bug Report
                </button>
            </div>
        </div>
    );
};
