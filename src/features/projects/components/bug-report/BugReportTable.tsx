import { Edit3, Trash2 } from 'lucide-react';
import { BugReport } from '../../types';
import { BugPriorityBadge } from './BugPriorityBadge';
import { BugStatusBadge } from './BugStatusBadge';

interface BugReportTableProps {
    bugs: BugReport[];
    onEdit?: (bug: BugReport) => void;
    onDelete?: (bugId: string) => void;
}

export const BugReportTable = ({ bugs, onEdit, onDelete }: BugReportTableProps) => {
    const hasActions = Boolean(onEdit || onDelete);
    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <tr>
                        <th className="px-4 py-3 text-left">Bug ID</th>
                        <th className="px-4 py-3 text-left">Assign To</th>
                        <th className="px-4 py-3 text-left">Bug Title</th>
                        <th className="px-4 py-3 text-left">Start Date</th>
                        <th className="px-4 py-3 text-left">Due Date</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Priority</th>
                        <th className="px-4 py-3 text-left">Created By</th>
                        {hasActions && <th className="px-4 py-3 text-center">Action</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {bugs.map((bug) => (
                        <tr key={bug.id} className="hover:bg-gray-50/80">
                            <td className="px-4 py-4 font-semibold text-gray-900">{bug.issueCode}</td>
                            <td className="px-4 py-4 text-gray-700">{bug.assignedTo}</td>
                            <td className="px-4 py-4 text-gray-900">{bug.title}</td>
                            <td className="px-4 py-4 text-gray-600">{bug.startDate}</td>
                            <td className="px-4 py-4 text-gray-600">{bug.dueDate}</td>
                            <td className="px-4 py-4">
                                <BugStatusBadge status={bug.status} />
                            </td>
                            <td className="px-4 py-4">
                                <BugPriorityBadge priority={bug.priority} />
                            </td>
                            <td className="px-4 py-4 text-gray-700">{bug.createdBy}</td>
                            {hasActions && (
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        {onEdit && (
                                            <button
                                                type="button"
                                                onClick={() => onEdit(bug)}
                                                className="rounded-lg border border-gray-200 p-2 text-green-600 hover:bg-green-50"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                type="button"
                                                onClick={() => onDelete(bug.id)}
                                                className="rounded-lg border border-gray-200 p-2 text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                    {!bugs.length && (
                        <tr>
                            <td colSpan={hasActions ? 9 : 8} className="px-4 py-12 text-center text-gray-500">
                                No bug reports yet. Click “Add Bug Report” to create one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
