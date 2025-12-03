/**
 * @file BugReportView.tsx
 * @description Bug Report view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import { Suspense } from 'react';

import { useBugReportController } from '../hooks/useBugReportController';
import { BugReportToolbar } from './bug-report/BugReportToolbar';
import { BugReportTable } from './bug-report/BugReportTable';
import { CreateBugReportModal } from './modal/bug-report/CreateBugReportModal';
import { AiGenerateModal } from './modal/bug-report/AiGenerateModal';
import { BugReportHeader } from './bug-report/BugReportHeader';

interface BugReportViewProps {
    projectId: string;
}

const LoadingState = () => (
    <div className="p-6">
        <div className="h-6 w-48 rounded bg-gray-200 animate-pulse" />
    </div>
);

export const BugReportView = ({ projectId }: BugReportViewProps) => {
    const {
        project,
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
        submitBugReport,
        aiFormState,
        updateAiFormState,
        generateAiSuggestions,
        aiResults,
        applyAiResult,
        assigneeOptions,
        startEditBug,
        deleteBug,
        isEditing,
    } = useBugReportController(projectId);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingState />}>
                <BugReportHeader projectId={projectId} projectName={project.name} />
            </Suspense>

            <div className="p-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <BugReportToolbar
                        totalCount={filteredBugs.length}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        priorityFilter={priorityFilter}
                        onPriorityChange={setPriorityFilter}
                        searchKeyword={searchKeyword}
                        onSearchChange={setSearchKeyword}
                        onAddBug={openCreateModal}
                    />

                    <BugReportTable
                        bugs={filteredBugs}
                        onEdit={startEditBug}
                        onDelete={deleteBug}
                    />
                </div>
            </div>

            <CreateBugReportModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onSubmit={submitBugReport}
                onOpenAi={openAiModal}
                formState={formState}
                updateFormState={updateFormState}
                assigneeOptions={assigneeOptions}
                isEditing={isEditing}
            />

            <AiGenerateModal
                isOpen={isAiModalOpen}
                onClose={closeAiModal}
                formState={aiFormState}
                updateFormState={updateAiFormState}
                onGenerate={generateAiSuggestions}
                results={aiResults}
                onApplyResult={applyAiResult}
            />
        </div>
    );
};
