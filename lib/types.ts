// Auth Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  phone:string;
  avatar_url?: string | null;
  role: 'admin' | 'manager' | 'member';
  created_at?: string;
  updated_at?: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  status: 'active' | 'archived' | 'completed';
  created_at: string;
  updated_at: string;
}
export interface IUser {
    _id: string;
    name?: string;
    email: string;
    role: "admin" | "manager" | "member";
    createdAt?: Date;
}
export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: IUser;
  role: 'admin' | 'manager' | 'member';
  joined_at: string;
  user?: User;
}

// Sprint Types
export interface Sprint {
  _id: string;
  project_id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  status: 'planning' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

// Task Types
export interface Task {
  id: string;
  sprint_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'in_review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string | null;
  estimated_hours: number | null;
  spent_hours: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  assigned_user?: User;
}

// Comment Types
export interface Comment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  project_id: string;
  user_id: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, any> | null;
  created_at: string;
  user?: User;
}

// Time Entry Types
export interface TimeEntry {
  id: string;
  task_id: string;
  user_id: string;
  hours: number;
  date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
  task?: Task;
}
