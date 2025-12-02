import { GanttChartView } from '@/features/projects/components/GanttChartView';

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    return <GanttChartView projectId={projectId} />;
}
