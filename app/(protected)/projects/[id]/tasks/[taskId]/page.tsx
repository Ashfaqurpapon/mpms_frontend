import { TaskDetail } from '@/components/task-detail';

interface TaskPageProps {
  params: Promise<{ id: string; taskId: string }>;
}

export const metadata = {
  title: 'Task - MPMS',
};

export default async function TaskPage({ params }: TaskPageProps) {
  const { id: projectId, taskId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Task Details</h1>
      </div>
      <TaskDetail projectId={projectId} taskId={taskId} />
    </div>
  );
}
