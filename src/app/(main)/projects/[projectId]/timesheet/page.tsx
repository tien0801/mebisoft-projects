import { TimesheetView } from '@/features/projects/components/TimesheetView';

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    return <TimesheetView projectId={projectId} />;
}
