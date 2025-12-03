/**
 * @file expense.types.ts
 * @description Types for the expense view feature
 */

export interface ExpenseAttachment {
    id: string;
    name: string;
}

export interface ExpenseEntry {
    id: string;
    name: string;
    amount: number;
    date: string;
    description?: string;
    taskId?: string;
    taskName?: string;
    attachments: ExpenseAttachment[];
}

export interface ExpenseFormState {
    name: string;
    amount: string;
    date: string;
    description: string;
    taskId: string;
    attachments: ExpenseAttachment[];
}

export interface ExpenseViewProps {
    projectId: string;
}
