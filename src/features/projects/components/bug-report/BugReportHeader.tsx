'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BugReportHeaderProps {
    projectId: string;
    projectName: string;
}

export const BugReportHeader = ({ projectId, projectName }: BugReportHeaderProps) => {
    return (
        <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <Link href={`/projects/${projectId}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Project
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug Report</h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/dashboard" className="text-green-600 hover:underline">
                    Dashboard
                </Link>
                <span className="text-gray-400">›</span>
                <Link href="/projects" className="text-green-600 hover:underline">
                    Project
                </Link>
                <span className="text-gray-400">›</span>
                <Link href={`/projects/${projectId}`} className="text-green-600 hover:underline">
                    {projectName}
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900">Bug Report</span>
            </nav>
        </div>
    );
};
