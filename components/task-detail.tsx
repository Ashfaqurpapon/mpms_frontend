'use client';

import { useState, useEffect } from 'react';
import { getTasks, getComments, createComment, updateTask } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import type { Task, Comment } from '@/lib/types';
import { api } from '@/lib/api-lib';

interface TaskDetailProps {
  projectId: string;
  taskId: string;
}

export function TaskDetail({ projectId, taskId }: TaskDetailProps) {
  const supabase = createClient();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const tasks = await api.getAllTasks();
        //   console.log("paici re",taskId);
        // console.log("task paici", tasks);
        // This needs sprint context
        const foundTask = (tasks.data as Task[]).find(
          (t) => t.id === taskId
        );

      
        
        if (foundTask) {
          setTask(foundTask);
          const commentsData = await getComments(taskId);
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Failed to load task:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !task) return;

    try {
      setSubmittingComment(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const newComment = await createComment({
        task_id: taskId,
        user_id: user.id,
        content: commentText,
      });

      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return <div>Loading task...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline">{task.status}</Badge>
                <Badge variant="secondary">{task.priority}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {task.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Assigned To
              </p>
              <p>
                {task.assigned_user?.full_name ||
                  task.assigned_user?.email ||
                  'Unassigned'}
              </p>
            </div>
            {task.estimated_hours && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Estimated Hours
                </p>
                <p>{task.estimated_hours}h</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Spent Hours
              </p>
              <p>{task.spent_hours}h</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created
              </p>
              <p>{new Date(task.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 bg-slate-50 rounded-md border"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">
                    {comment.user?.full_name || comment.user?.email}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
            />
            <Button
              onClick={handleAddComment}
              disabled={submittingComment || !commentText.trim()}
            >
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
