import { ProjectForm } from '@/components/project-form';

export const metadata = {
  title: 'New Project - MPMS',
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground mt-2">
          Start managing your project with sprints and tasks
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
