import { BUG_STATUS_COLORS, BUG_STATUS_LABELS, BugStatus } from '../../types';

interface BugStatusBadgeProps {
    status: BugStatus;
}

export const BugStatusBadge = ({ status }: BugStatusBadgeProps) => {
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${BUG_STATUS_COLORS[status]}`}>
            {BUG_STATUS_LABELS[status]}
        </span>
    );
};
