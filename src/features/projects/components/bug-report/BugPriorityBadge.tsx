import { BUG_PRIORITY_COLORS, BUG_PRIORITY_LABELS, BugPriority } from '../../types';

interface BugPriorityBadgeProps {
    priority: BugPriority;
}

export const BugPriorityBadge = ({ priority }: BugPriorityBadgeProps) => {
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${BUG_PRIORITY_COLORS[priority]}`}>
            {BUG_PRIORITY_LABELS[priority]}
        </span>
    );
};
