'use client';

import { useState, useEffect } from 'react';
import { getTasks, updateTask } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Sprint, Task } from '@/lib/types';

interface SprintBoardProps {
  sprint: Sprint;
  projectId: string;
}

const STATUS_COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-100' },
  { id: 'in_review', label: 'In Review', color: 'bg-yellow-100' },
  { id: 'completed', label: 'Completed', color: 'bg-green-100' },
];

export function SprintBoard({ sprint, projectId }: SprintBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(false);
        const data = await getTasks(sprint.id);
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };

    loadTasks();
  }, [sprint.id]);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: string) => {
    if (!draggedTask) return;

    try {
      await updateTask(draggedTask.id, { status: status as any });
      setTasks(
        tasks.map((t) =>
          t.id === draggedTask.id ? { ...t, status: status as any } : t
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{sprint.name}</CardTitle>
            {sprint.start_date && sprint.end_date && (
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(sprint.start_date).toLocaleDateString()} -{' '}
                {new Date(sprint.end_date).toLocaleDateString()}
              </p>
            )}
          </div>
          <Link href={`/projects/${projectId}/sprints/${sprint.id}/tasks/new`}>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {STATUS_COLUMNS.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className={`rounded-lg p-3 min-h-[500px] ${column.color}`}
            >
              <h3 className="font-semibold mb-3">
                {column.label} ({getTasksByStatus(column.id).length})
              </h3>
              <div className="space-y-2">
                {getTasksByStatus(column.id).map((task) => (
                  <Link
                    key={task.id}
                    href={`/projects/${projectId}/tasks/${task.id}`}
                  >
                    <div
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="bg-white p-3 rounded-md border shadow-sm cursor-move hover:shadow-md transition-shadow"
                    >
                      <p className="font-medium text-sm line-clamp-2">
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        {task.assigned_user && (
                          <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                            {task.assigned_user.full_name?.split(' ')[0] ||
                              task.assigned_user.email.split('@')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}
