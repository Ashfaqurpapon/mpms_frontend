'use client';

import { SprintForm } from '@/components/sprint-form';
import { useParams } from 'next/navigation';

export default function NewSprintPage() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <SprintForm projectId={projectId} />
    </div>
  );
}
