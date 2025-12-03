import { TrackerView } from '@/features/projects/components/TrackerView';

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    return <TrackerView projectId={projectId} />;
}
