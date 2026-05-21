import { TaskForm } from '@/components/task-form';

interface NewTaskPageProps {
  params: Promise<{ id: string; sprintId: string }>;
}

export const metadata = {
  title: 'New Task - MPMS',
};

export default async function NewTaskPage({ params }: NewTaskPageProps) {
  const { id: projectId, sprintId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="text-muted-foreground mt-2">
          Add a new task to your sprint
        </p>
      </div>
      <TaskForm projectId={projectId} sprintId={sprintId} />
    </div>
  );
}
