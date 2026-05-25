# Multi-Project Management System (MPMS)

A full-stack project management application built with Next.js, TypeScript,ExpressJs MongoDB, and shadcn/ui.

## Features

### Core Functionality
- **Project Management** - Create, view, and manage multiple projects
- **Team Collaboration** - Add team members and manage roles (Admin, Manager, Member)
- **Sprint Planning** - Organize work into sprints with start/end dates
- **Task Management** - Create tasks with priority levels (Low, Medium, High, Urgent)
- **Activity Logs** - Track all project activities and changes

### Technical Features
- Row Level Security (RLS) for data protection
- Real-time data synchronization 
- Responsive design for desktop and mobile
- TypeScript for type safety
- Server-side session management
- Protected routes with authentication

## Database Schema

The application uses 5 interconnected tables:

1. **users** - Extended Supabase auth with profiles
2. **projects** - Project records with owner tracking
3. **project_members** - Team member assignments with roles
4. **sprints** - Sprint planning with date ranges
5. **tasks** - Task details with status and priority


## Setup Instructions

### 1. Prerequisites
- Node.js 18+ with pnpm
- Backend Connect with this Url(BASE_URL: "https://mpms-backend-emhp.onrender.com")

### 2. Clone and Install
```bash
git clone <repo-url>
cd v0-project
pnpm install
```

### 3. Configure Environment Variables

Get your .env.example
- Set your MongoDB cluster

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
  api.api-lib           # Fetch all data from Backend
  api-response-classs   # ALl response types routes
  api-route-constant    # All backend routes
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
