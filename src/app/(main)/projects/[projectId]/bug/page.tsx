import { BugReportView } from '@/features/projects/components/BugReportView';

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    return <BugReportView projectId={projectId} />;
}
