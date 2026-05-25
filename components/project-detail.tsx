'use client';

import { useState, useEffect } from 'react';
import { getProject, getSprints, getTasks, getProjectMembers } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Plus, Settings } from 'lucide-react';
import { SprintBoard } from './sprint-board';
import { ProjectMembers } from './project-members';
import type { Project, Sprint } from '@/lib/types';
import { api } from '@/lib/api-lib';
import { useAuth } from '@/contexts/auth-context';

interface ProjectDetailProps {
  projectId: string;
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('sprints');
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
    

        const projectData = await api.getSingleProduct(projectId)
        const sprintsData = await api.getAllSprints({
          projectId,
        })


        console.log("projectData", sprintsData);

        setProject(projectData);
        setSprints(sprintsData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectId]);

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>;
  }

  if (!project) {
    return <div className="text-red-600">Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
        {/* <Link href={`/projects/${projectId}/settings`}>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link> */}
      </div>

      {error && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
          <TabsTrigger value="tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="sprints" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Sprints</h2>

            {/* {(user?.role === 'admin' || user?.role === 'manager') && (
              <Link href="/projects/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </Link>
            )} */}
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <Link href={`/projects/${projectId}/sprints/new`}>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Sprint
                </Button>
              </Link>
            )}
          </div>
          {sprints.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No sprints yet</p>
                 {(user?.role === 'admin' || user?.role === 'manager') && (
                <Link href={`/projects/${projectId}/sprints/new`}>
                  <Button>Create your first sprint</Button>
                </Link>
                 )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sprints.map((sprint) => (
                <SprintBoard
                  key={sprint._id}
                  sprint={sprint}
                  projectId={projectId}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <h2 className="text-xl font-semibold">All Tasks</h2>
          <div className="text-muted-foreground">Task list view coming soon...</div>
        </TabsContent>

        <TabsContent value="members">
          <ProjectMembers projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
