'use client';

import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { ExpenseEntry, ExpenseFormState } from '../types/expense.types';

const INITIAL_FORM_STATE: ExpenseFormState = {
    name: '',
    amount: '',
    date: '',
    description: '',
    taskId: '',
    attachments: [],
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatDisplayDate = (value: string) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const useExpenseViewController = (projectId: string) => {
    const { projects } = useProjectStore();

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId);
    }, [projects, projectId]);

    const projectTasks = project?.tasks ?? [];

    const [expenses, setExpenses] = useState<ExpenseEntry[]>([
        {
            id: 'expense-1',
            name: 'Hiring Individual Positions',
            amount: 100,
            date: '2025-05-01',
            description: 'Cheyenne Wong',
            attachments: [],
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState<ExpenseFormState>(INITIAL_FORM_STATE);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const filteredExpenses = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase();
        if (!keyword) return expenses;

        return expenses.filter((expense) =>
            [expense.name, expense.description, expense.taskName]
                .filter(Boolean)
                .some((text) => text?.toLowerCase().includes(keyword)),
        );
    }, [expenses, searchTerm]);

    const visibleExpenses = filteredExpenses.slice(0, pageSize);
    const showingStart = filteredExpenses.length ? 1 : 0;
    const showingEnd = filteredExpenses.length ? Math.min(filteredExpenses.length, pageSize) : 0;

    const handleOpenModal = useCallback(() => {
        setFormState(INITIAL_FORM_STATE);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setFormState(INITIAL_FORM_STATE);
        setIsModalOpen(false);
    }, []);

    const handleFormChange = useCallback((key: keyof ExpenseFormState, value: string | ExpenseFormState['attachments']) => {
        setFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const handleAttachmentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const attachments = Array.from(files).map((file) => ({
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
        }));

        handleFormChange('attachments', attachments);
    }, [handleFormChange]);

    const handleDeleteExpense = useCallback((expenseId: string) => {
        setExpenses((prev) => prev.filter((item) => item.id !== expenseId));
    }, []);

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!formState.name || !formState.amount || !formState.date) {
                return;
            }

            const task = projectTasks.find((taskItem) => taskItem.id === formState.taskId);

            const newExpense: ExpenseEntry = {
                id: `expense-${Date.now()}`,
                name: formState.name,
                amount: Number(formState.amount),
                date: formState.date,
                description: formState.description,
                taskId: formState.taskId || undefined,
                taskName: task?.name,
                attachments: formState.attachments,
            };

            setExpenses((prev) => [newExpense, ...prev]);
            handleCloseModal();
        },
        [formState, handleCloseModal, projectTasks],
    );

    return {
        project,
        projectTasks,
        currencyFormatter,
        formatDisplayDate,
        expenses,
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
    };
};
