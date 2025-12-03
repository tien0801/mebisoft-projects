/**
 * @file project-component.types.ts
 * @description UI component specific types for Projects feature
 */

export interface ProjectReportDetailProps {
    projectId: string;
}

export interface ProjectDetailProps {
    projectId: string;
}

export interface GanttChartViewProps {
    projectId: string;
}

export interface TrackerViewProps {
    projectId: string;
}

export interface BugReportViewProps {
    projectId: string;
}

export type Timeframe = 'quarter' | 'half' | 'day' | 'week' | 'month';

export interface GanttTask {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    color: string;
}

export interface TimelineHeader {
    label: string;
    count: number;
}

export interface DateCell {
    date: Date;
    topLabel: string;
    bottomLabel: string;
}
