import { createClient } from '@/lib/supabase/client';
import type { Project, Sprint, Task, Comment, ProjectMember, TimeEntry, ActivityLog } from './types';

const supabase = createClient();

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Project[];
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Project;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

// Sprints
export async function getSprints(projectId: string) {
  const { data, error } = await supabase
    .from('sprints')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Sprint[];
}

export async function createSprint(sprint: Omit<Sprint, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('sprints')
    .insert([sprint])
    .select()
    .single();
  if (error) throw error;
  return data as Sprint;
}

export async function updateSprint(id: string, updates: Partial<Sprint>) {
  const { data, error } = await supabase
    .from('sprints')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Sprint;
}

// Tasks
export async function getTasks(sprintId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, assigned_user:assigned_to(id, email, full_name, avatar_url)')
    .eq('sprint_id', sprintId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Task[];
}

export async function getTasksByProject(projectId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, assigned_user:assigned_to(id, email, full_name, avatar_url)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Task[];
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'spent_hours'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Comments
export async function getComments(taskId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, user:user_id(id, email, full_name, avatar_url)')
    .eq('task_id', taskId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as Comment[];
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single();
  if (error) throw error;
  return data as Comment;
}

// Project Members
export async function getProjectMembers(projectId: string) {
  const { data, error } = await supabase
    .from('project_members')
    .select('*, user:user_id(id, email, full_name, avatar_url)')
    .eq('project_id', projectId);
  if (error) throw error;
  return data as ProjectMember[];
}

export async function addProjectMember(member: Omit<ProjectMember, 'id' | 'joined_at'>) {
  const { data, error } = await supabase
    .from('project_members')
    .insert([member])
    .select()
    .single();
  if (error) throw error;
  return data as ProjectMember;
}

export async function removeProjectMember(projectId: string, userId: string) {
  const { error } = await supabase
    .from('project_members')
    .delete()
    .eq('project_id', projectId)
    .eq('user_id', userId);
  if (error) throw error;
}

// Time Entries
export async function getTimeEntries(taskId: string) {
  const { data, error } = await supabase
    .from('time_entries')
    .select('*')
    .eq('task_id', taskId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data as TimeEntry[];
}

export async function createTimeEntry(entry: Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('time_entries')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data as TimeEntry;
}

// Activity Logs
export async function getActivityLogs(projectId: string) {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*, user:user_id(id, email, full_name, avatar_url)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data as ActivityLog[];
}
