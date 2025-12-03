/**
 * @file bug-report.types.ts
 * @description Domain types for project bug reports and supporting UI state
 */

export enum BugStatus {
    CONFIRMED = 'confirmed',
    RESOLVED = 'resolved',
    UNCONFIRMED = 'unconfirmed',
    IN_PROGRESS = 'in_progress',
    VERIFIED = 'verified',
}

export const BUG_STATUS_LABELS: Record<BugStatus, string> = {
    [BugStatus.CONFIRMED]: 'Confirmed',
    [BugStatus.RESOLVED]: 'Resolved',
    [BugStatus.UNCONFIRMED]: 'Unconfirmed',
    [BugStatus.IN_PROGRESS]: 'In Progress',
    [BugStatus.VERIFIED]: 'Verified',
};

export const BUG_STATUS_COLORS: Record<BugStatus, string> = {
    [BugStatus.CONFIRMED]: 'bg-green-100 text-green-700',
    [BugStatus.RESOLVED]: 'bg-emerald-100 text-emerald-700',
    [BugStatus.UNCONFIRMED]: 'bg-amber-100 text-amber-700',
    [BugStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-700',
    [BugStatus.VERIFIED]: 'bg-purple-100 text-purple-700',
};

export enum BugPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export const BUG_PRIORITY_LABELS: Record<BugPriority, string> = {
    [BugPriority.LOW]: 'Low',
    [BugPriority.MEDIUM]: 'Medium',
    [BugPriority.HIGH]: 'High',
};

export const BUG_PRIORITY_COLORS: Record<BugPriority, string> = {
    [BugPriority.LOW]: 'bg-gray-100 text-gray-700',
    [BugPriority.MEDIUM]: 'bg-yellow-100 text-yellow-700',
    [BugPriority.HIGH]: 'bg-red-100 text-red-700',
};

export interface BugReport {
    id: string;
    projectId: string;
    issueCode: string;
    title: string;
    description?: string;
    startDate: string;
    dueDate: string;
    status: BugStatus;
    priority: BugPriority;
    assignedTo: string;
    createdBy: string;
    createdAt: string;
}

export interface BugReportFilter {
    status?: BugStatus | 'all';
    search?: string;
    priority?: BugPriority | 'all';
}

export interface BugReportFormState {
    title: string;
    startDate: string;
    dueDate: string;
    status: BugStatus;
    priority: BugPriority;
    assignedTo: string;
    description: string;
}

export type BugAiTarget = 'title' | 'description';

export interface BugAiFormState {
    target: BugAiTarget;
    language: string;
    creativity: 'low' | 'medium' | 'high';
    resultCount: number;
    maxLength: number;
    prompt: string;
}
