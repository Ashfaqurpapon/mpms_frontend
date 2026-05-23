'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createTask, getProjectMembers } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ProjectMember } from '@/lib/types';
import { api } from '@/lib/api-lib';
import { useAuth } from '@/contexts/auth-context';

interface TaskFormProps {
  projectId: string;
  sprintId: string;
}

export function TaskForm({ projectId, sprintId }: TaskFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    estimated_hours: '',
    assigned_to: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    // const loadMembers = async () => {
    //   try {
    //     const data = await getProjectMembers(projectId);
    //     setMembers(data);
    //   } catch (err) {
    //     console.error('Failed to load members:', err);
    //   }
    // };
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await api.getAllMembers({ projectId });

        console.log("member paite cai", data);

        setMembers(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load members');
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, [projectId]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      
       

      if (!user) {
        throw new Error('Not authenticated');
      }

      const task =({
        title: formData.title,
        description: formData.description,
        priority: formData.priority as any,
        estimated_hours: formData.estimated_hours
          ? parseFloat(formData.estimated_hours)
          : null,
        assigned_to: formData.assigned_to || null,
        status: 'todo',
        sprint_id: sprintId,
        project_id: projectId,
        created_by: user.id,
      });

      
      const result=await api.createTask({task})
      console.log("result paici",result);
      
      

      router.push(`/projects/${projectId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Task Title
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  handleSelectChange('priority', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Hours
              </label>
              <Input
                type="number"
                name="estimated_hours"
                value={formData.estimated_hours}
                onChange={handleChange}
                placeholder="e.g., 8"
                step="0.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Assign To
            </label>
            <Select
              value={formData.assigned_to}
              onValueChange={(value) =>
                handleSelectChange('assigned_to', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {members.map((member) => (
                  <SelectItem key={member.user_id._id} value={member.user_id._id}>
                    { member.user_id?.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
