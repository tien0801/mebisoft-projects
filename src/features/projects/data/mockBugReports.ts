/**
 * @file mockBugReports.ts
 * @description Mock data set for bug reports across projects
 */

import { BugPriority, BugReport, BugStatus } from '../types';

export const MOCK_BUG_REPORTS: BugReport[] = [
    {
        id: 'bug-1',
        projectId: '2',
        issueCode: '#ISSUE0001',
        title: 'Login page failure',
        description: 'Users sometimes receive a 500 error when logging in via SSO.',
        startDate: '2023-07-31',
        dueDate: '2024-07-23',
        status: BugStatus.CONFIRMED,
        priority: BugPriority.LOW,
        assignedTo: 'Workdo',
        createdBy: 'Workdo',
        createdAt: '2023-07-31',
    },
    {
        id: 'bug-2',
        projectId: '2',
        issueCode: '#ISSUE0002',
        title: 'Forgot password error',
        description: 'Reset email is not delivered when clicking forgot password.',
        startDate: '2021-07-21',
        dueDate: '2021-07-21',
        status: BugStatus.CONFIRMED,
        priority: BugPriority.MEDIUM,
        assignedTo: 'Buffy Walter',
        createdBy: 'Workdo',
        createdAt: '2021-07-21',
    },
    {
        id: 'bug-3',
        projectId: '2',
        issueCode: '#ISSUE0003',
        title: 'Validation remaining',
        description: 'Newsletter form validation missing required fields.',
        startDate: '2021-07-21',
        dueDate: '2021-07-21',
        status: BugStatus.UNCONFIRMED,
        priority: BugPriority.HIGH,
        assignedTo: 'Maia',
        createdBy: 'Workdo',
        createdAt: '2021-07-21',
    },
    {
        id: 'bug-4',
        projectId: '2',
        issueCode: '#ISSUE0004',
        title: 'Design layouts issue',
        description: 'Layout overlaps in Safari for long newsletter templates.',
        startDate: '2021-07-04',
        dueDate: '2021-07-08',
        status: BugStatus.IN_PROGRESS,
        priority: BugPriority.MEDIUM,
        assignedTo: 'Richard Atkinson',
        createdBy: 'Workdo',
        createdAt: '2021-07-04',
    },
];
