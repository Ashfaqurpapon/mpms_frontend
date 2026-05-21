# MPMS (Multi-Project Management System) - Setup Guide

## Overview
MPMS is a full-stack project management application built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. It supports project creation, sprint planning, task management, team collaboration, and time tracking.

## Prerequisites
- Supabase project created at supabase.com
- Node.js and pnpm installed

## Environment Configuration

### Step 1: Get Supabase Credentials
1. Go to your Supabase dashboard: https://app.supabase.com
2. Click on your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (under "Project Ref")
   - **Anon public** key (under "Project API Keys")

### Step 2: Add Environment Variables
Add these to your v0 project's **Settings → Vars**:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Running the Application

The application is already configured. Just ensure the environment variables are set and the dev server will start automatically.

### Access Points
- **Home**: http://localhost:3000 (redirects to login if not authenticated)
- **Login**: http://localhost:3000/auth/login
- **Sign Up**: http://localhost:3000/auth/sign-up
- **Dashboard** (after login): http://localhost:3000/dashboard

## Features

### Authentication
- Email/password signup and login
- Automatic user profile creation
- Session management with middleware

### Project Management
- Create and manage projects
- Set project descriptions and status (active, archived, completed)
- Invite team members to projects

### Sprint Management
- Create sprints within projects
- Set sprint dates and status (planning, active, completed)
- Organize tasks by sprint

### Task Management
- Create tasks with title, description, priority, and status
- Assign tasks to team members
- Track estimated vs spent hours
- Update task status through kanban board
- Priority levels: Low, Medium, High, Urgent
- Status: To Do, In Progress, In Review, Completed

### Team Collaboration
- Add team members to projects
- Assign roles (admin, manager, member)
- View project activity logs
- Comment on tasks

### Time Tracking
- Log time entries for tasks
- Track estimated vs actual hours
- View time analytics

## Database Schema

### Tables
1. **users** - User profiles linked to Supabase auth
2. **projects** - Project management
3. **project_members** - Team membership and roles
4. **sprints** - Sprint organization
5. **tasks** - Task management
6. **comments** - Task discussion
7. **activity_logs** - Project audit trail
8. **time_entries** - Time tracking

All tables have Row Level Security (RLS) policies for data protection.

## Security
- Row Level Security (RLS) on all tables
- Secure authentication with Supabase Auth
- User data isolation by project
- Activity logging for compliance

## Tech Stack
- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form, Zod validation

## Troubleshooting

### "Supabase URL and/or Anonymous Key are not configured"
- Check that environment variables are set in Settings → Vars
- Make sure to use `NEXT_PUBLIC_` prefix for client-side variables
- Restart the dev server after adding env vars

### Email verification not working
- Check that the redirect URL is correct: `http://localhost:3000/auth/callback`
- Verify email configuration in Supabase project settings

### Can't access protected pages
- Ensure you're logged in by visiting `/auth/login`
- Session is managed via middleware - check browser cookies

## Next Steps
1. Sign up with your email
2. Confirm your email (check inbox)
3. Create your first project
4. Add team members
5. Create sprints and tasks
6. Start using the kanban board
