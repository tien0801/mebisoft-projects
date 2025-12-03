'use client';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import { useAuth } from '@/features/auth';
import { useProjectStore } from '../store/projectStore';
import {
    BugAiFormState,
    BugPriority,
    BugReport,
    BugReportFormState,
    BugStatus,
    Project,
} from '../types';

type StatusFilter = BugStatus | 'all';
type PriorityFilter = BugPriority | 'all';

const buildDefaultFormState = (assignee?: string): BugReportFormState => ({
    title: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    status: BugStatus.CONFIRMED,
    priority: BugPriority.LOW,
    assignedTo: assignee ?? 'Unassigned',
    description: '',
});

const buildFormStateFromBug = (bug: BugReport): BugReportFormState => ({
    title: bug.title,
    startDate: bug.startDate,
    dueDate: bug.dueDate,
    status: bug.status,
    priority: bug.priority,
    assignedTo: bug.assignedTo,
    description: bug.description ?? '',
});

const DEFAULT_AI_FORM: BugAiFormState = {
    target: 'title',
    language: 'en',
    creativity: 'high',
    resultCount: 1,
    maxLength: 12,
    prompt: '',
};

interface BugReportControllerResult {
    project?: Project;
    bugs: BugReport[];
    filteredBugs: BugReport[];
    statusFilter: StatusFilter;
    setStatusFilter: (value: StatusFilter) => void;
    priorityFilter: PriorityFilter;
    setPriorityFilter: (value: PriorityFilter) => void;
    searchKeyword: string;
    setSearchKeyword: (value: string) => void;
    isCreateModalOpen: boolean;
    openCreateModal: () => void;
    closeCreateModal: () => void;
    isAiModalOpen: boolean;
    openAiModal: () => void;
    closeAiModal: () => void;
    formState: BugReportFormState;
    updateFormState: <Key extends keyof BugReportFormState>(key: Key, value: BugReportFormState[Key]) => void;
    resetFormState: () => void;
    submitBugReport: () => void;
    aiFormState: BugAiFormState;
    updateAiFormState: <Key extends keyof BugAiFormState>(key: Key, value: BugAiFormState[Key]) => void;
    generateAiSuggestions: () => void;
    aiResults: string[];
    applyAiResult: (value: string) => void;
    assigneeOptions: string[];
    startEditBug: (bug: BugReport) => void;
    deleteBug: (bugId: string) => void;
    isEditing: boolean;
}

export const useBugReportController = (projectId: string): BugReportControllerResult => {
    const projects = useProjectStore((state) => state.projects);
    const bugReports = useProjectStore((state) => state.bugReports);
    const addBugReport = useProjectStore((state) => state.addBugReport);
    const updateBugReport = useProjectStore((state) => state.updateBugReport);
    const removeBugReport = useProjectStore((state) => state.removeBugReport);
    const { user } = useAuth();

    const project = useMemo(() => projects.find((candidate) => candidate.id === projectId), [projects, projectId]);

    const projectBugs = useMemo(
        () => bugReports.filter((bug) => bug.projectId === projectId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
        [bugReports, projectId],
    );

    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
    const [searchKeyword, setSearchKeyword] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [editingBugId, setEditingBugId] = useState<string | null>(null);

    const assigneeOptions = useMemo(() => project?.members?.map((member) => member.name) ?? ['Workdo'], [project?.members]);

    const [formState, setFormState] = useState<BugReportFormState>(() => buildDefaultFormState(assigneeOptions[0]));

    const [aiFormState, setAiFormState] = useState<BugAiFormState>(DEFAULT_AI_FORM);
    const [aiResults, setAiResults] = useState<string[]>([]);

    const filteredBugs = useMemo(() => {
        return projectBugs.filter((bug) => {
            if (statusFilter !== 'all' && bug.status !== statusFilter) {
                return false;
            }
            if (priorityFilter !== 'all' && bug.priority !== priorityFilter) {
                return false;
            }
            if (searchKeyword.trim()) {
                const keyword = searchKeyword.trim().toLowerCase();
                return (
                    bug.issueCode.toLowerCase().includes(keyword) ||
                    bug.title.toLowerCase().includes(keyword) ||
                    bug.assignedTo.toLowerCase().includes(keyword)
                );
            }
            return true;
        });
    }, [projectBugs, statusFilter, priorityFilter, searchKeyword]);

    const openCreateModal = () => {
        setEditingBugId(null);
        setIsCreateModalOpen(true);
        setFormState(buildDefaultFormState(assigneeOptions[0]));
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setEditingBugId(null);
    };

    const startEditBug = (bug: BugReport) => {
        setEditingBugId(bug.id);
        setFormState(buildFormStateFromBug(bug));
        setIsCreateModalOpen(true);
    };

    const openAiModal = () => {
        setIsAiModalOpen(true);
        setAiResults([]);
    };

    const closeAiModal = () => {
        setIsAiModalOpen(false);
    };

    const updateFormState = (key: keyof BugReportFormState, value: BugReportFormState[typeof key]) => {
        setFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetFormState = () => {
        setFormState(buildDefaultFormState(assigneeOptions[0]));
    };

    const submitBugReport = () => {
        if (!project) return;
        const trimmedTitle = formState.title.trim();
        if (!trimmedTitle) {
            return;
        }

        if (editingBugId) {
            updateBugReport(editingBugId, (prev) => ({
                ...prev,
                title: trimmedTitle,
                description: formState.description,
                startDate: formState.startDate,
                dueDate: formState.dueDate,
                status: formState.status,
                priority: formState.priority,
                assignedTo: formState.assignedTo,
            }));
        } else {
            const newBug: BugReport = {
                id: nanoid(),
                projectId: project.id,
                issueCode: `#ISSUE${String(projectBugs.length + 1).padStart(4, '0')}`,
                title: trimmedTitle,
                description: formState.description,
                startDate: formState.startDate,
                dueDate: formState.dueDate,
                status: formState.status,
                priority: formState.priority,
                assignedTo: formState.assignedTo,
                createdBy: user?.name ?? 'Unknown User',
                createdAt: dayjs().format('YYYY-MM-DD'),
            };

            addBugReport(newBug);
        }

        closeCreateModal();
        resetFormState();
    };

    const deleteBug = (bugId: string) => {
        removeBugReport(bugId);
        if (editingBugId === bugId) {
            setEditingBugId(null);
            resetFormState();
        }
    };

    const updateAiFormState = (key: keyof BugAiFormState, value: BugAiFormState[typeof key]) => {
        setAiFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const generateAiSuggestions = () => {
        if (!aiFormState.prompt.trim()) {
            setAiResults([]);
            return;
        }

        const base = aiFormState.prompt.trim();
        const creativityBoost = aiFormState.creativity === 'high' ? 'Creative' : aiFormState.creativity === 'medium' ? 'Detailed' : 'Concise';
        const results = Array.from({ length: aiFormState.resultCount }, (_, index) => {
            const prefix = aiFormState.target === 'title' ? 'Bug' : 'Issue';
            const numbered = `${prefix} ${index + 1}`;
            const content = `${creativityBoost} ${base}`.slice(0, aiFormState.maxLength * 10);
            return aiFormState.target === 'title' ? `${content}` : `${numbered}: ${content}`;
        });
        setAiResults(results);
    };

    const applyAiResult = (value: string) => {
        if (aiFormState.target === 'title') {
            updateFormState('title', value);
        } else {
            updateFormState('description', value);
        }
        closeAiModal();
    };

    return {
        project,
        bugs: projectBugs,
        filteredBugs,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        searchKeyword,
        setSearchKeyword,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        isAiModalOpen,
        openAiModal,
        closeAiModal,
        formState,
        updateFormState,
        resetFormState,
        submitBugReport,
        aiFormState,
        updateAiFormState,
        generateAiSuggestions,
        aiResults,
        applyAiResult,
        assigneeOptions,
        startEditBug,
        deleteBug,
        isEditing: Boolean(editingBugId),
    };
};
