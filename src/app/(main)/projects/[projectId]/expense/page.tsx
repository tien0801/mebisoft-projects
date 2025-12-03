import { ExpenseView } from '@/features/projects/components/ExpenseView';

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    return <ExpenseView projectId={projectId} />;
}
