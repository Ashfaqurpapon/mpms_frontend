# Multi-Project Management System (MPMS)

A full-stack project management application built with Next.js, TypeScript, Supabase, and shadcn/ui.

## Features

### Core Functionality
- **Project Management** - Create, view, and manage multiple projects
- **Team Collaboration** - Add team members and manage roles (Admin, Manager, Member)
- **Sprint Planning** - Organize work into sprints with start/end dates
- **Task Management** - Create tasks with priority levels (Low, Medium, High, Urgent)
- **Kanban Board** - Drag-and-drop task management across columns (To Do, In Progress, In Review, Completed)
- **Time Tracking** - Log hours spent on tasks with detailed time entries
- **Comments** - Collaborate on tasks with inline comments
- **Activity Logs** - Track all project activities and changes

### Technical Features
- Row Level Security (RLS) for data protection
- Real-time data synchronization with Supabase
- Responsive design for desktop and mobile
- TypeScript for type safety
- Server-side session management
- Protected routes with authentication

## Database Schema

The application uses 8 interconnected tables:

1. **users** - Extended Supabase auth with profiles
2. **projects** - Project records with owner tracking
3. **project_members** - Team member assignments with roles
4. **sprints** - Sprint planning with date ranges
5. **tasks** - Task details with status and priority
6. **comments** - Discussion threads on tasks
7. **activity_logs** - Audit trail of all actions
8. **time_entries** - Time tracking records

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ with pnpm
- Supabase account (https://app.supabase.com)

### 2. Clone and Install
```bash
git clone <repo-url>
cd v0-project
pnpm install
```

### 3. Configure Environment Variables

Get your Supabase credentials from https://app.supabase.com:
- Go to Settings → API
- Copy Project URL and Anonymous Key

Add to your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

### 4. Run the Development Server
```bash
pnpm dev
```

Visit http://localhost:3000

## Project Structure

```
app/
  page.tsx              # Public landing page
  auth/
    login/page.tsx      # Login page
    sign-up/page.tsx    # Sign-up page
    callback/route.ts   # OAuth/email link callback
  (protected)/          # Authenticated routes
    layout.tsx          # Protected layout with navigation
    dashboard/page.tsx  # Dashboard overview
    projects/page.tsx   # Projects list
    [id]/page.tsx       # Project detail
    [id]/sprints/       # Sprint management
    [id]/tasks/         # Task detail view
    profile/page.tsx    # User profile

components/
  navigation.tsx        # Sidebar navigation
  dashboard.tsx         # Dashboard component
  project-detail.tsx    # Project view
  sprint-board.tsx      # Kanban board
  project-members.tsx   # Team management
  task-form.tsx         # Task creation/editing
  task-detail.tsx       # Task with comments

lib/
  supabase/
    client.ts           # Client-side Supabase
    server.ts           # Server-side Supabase
    proxy.ts            # Session proxy
  types.ts              # TypeScript definitions
  api.ts                # API utilities
```

## Usage Guide

### Creating a Project
1. Click "New Project" on the dashboard
2. Enter project name and description
3. Click "Create Project"
4. The project appears in your projects list

### Adding Team Members
1. Open a project
2. Go to "Team Members" tab
3. Click "Add Member"
4. Enter their email and select role
5. They can now access the project

### Managing Sprints
1. In project detail, click "New Sprint"
2. Set sprint name and date range
3. Create tasks within the sprint
4. Tasks appear on the kanban board

### Tracking Time
1. Open a task
2. Click "Log Time" or "Time Entries"
3. Enter hours and date
4. Time is automatically summed for task estimates

## Authentication

The app uses Supabase Auth with email/password. Features:
- Email verification required for new signups
- Secure session management with HTTP-only cookies
- Automatic user profile creation on signup
- Protected routes with middleware redirect

## Deployment

### Deploy to Vercel
```bash
vercel deploy
```

Make sure to add environment variables in Vercel project settings.

## API Routes

### Task Management
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Performance Considerations

- Supabase caching with SWR for client state
- RLS policies prevent unauthorized data access
- Indexed foreign keys for fast queries
- Pagination for large result sets

## Security

- Row Level Security on all tables
- Secure session cookies (HTTP-only)
- Input validation with Zod
- CSRF protection via Next.js
- SQL injection prevention via parameterized queries

## Troubleshooting

### "Supabase URL not configured"
- Add `NEXT_PUBLIC_SUPABASE_URL` to environment variables

### "Permission denied" errors
- Check RLS policies in Supabase dashboard
- Verify user role assignments
- Confirm authentication status

### Tasks not appearing
- Check sprint status
- Verify you're in the correct project
- Check project membership

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on localhost
4. Submit a pull request

## License

MIT
# mpms_frontend
