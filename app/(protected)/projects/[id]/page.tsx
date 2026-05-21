import { ProjectDetail } from '@/components/project-detail';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Project - MPMS',
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetail projectId={id} />;
}
