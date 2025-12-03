/**
 * @file timesheet.types.ts
 * @description Types for the Timesheet view
 */

import { ProjectTask } from '../types';

export interface TimesheetViewProps {
    projectId: string;
}

export interface TimesheetModalState {
    task: ProjectTask;
    dayIndex: number;
}
