/**
 * @file ExpenseView.tsx
 * @description Expense view component
 * @author Mebisoft Team
 * @created 2025-11-26
 */

'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { useMemo } from 'react';

interface ExpenseViewProps {
    projectId: string;
}

export const ExpenseView = ({ projectId }: ExpenseViewProps) => {
    const { projects } = useProjectStore();

    const project = useMemo(() => {
        return projects.find(p => p.id === projectId);
    }, [projects, projectId]);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Project
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/dashboard" className="text-green-600 hover:underline">Dashboard</Link>
                    <span className="text-gray-400">›</span>
                    <Link href="/projects" className="text-green-600 hover:underline">Project</Link>
                    <span className="text-gray-400">›</span>
                    <Link href={`/projects/${projectId}`} className="text-green-600 hover:underline">{project.name}</Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-900">Expense</span>
                </nav>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="bg-white rounded-lg shadow p-6 min-h-96">
                    <div className="text-center text-gray-500">
                        <p className="mb-4">Expense View</p>
                        <p className="text-sm">Project: {project.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
