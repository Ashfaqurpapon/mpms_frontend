# MPMS (Multi-Project Management System) - Setup Guide

## Overview
MPMS is a modern full-stack project management application built with Next.js 16, TypeScript, Tailwind CSS, and MongoDB.

It helps teams efficiently manage:
- Projects
- Sprints
- Tasks
- Team Collaboration
- Time Tracking

The platform provides a clean and scalable workflow management system for developers and teams.

---

# Features

## Authentication
- Email/password signup and login
- JWT-based authentication
- Automatic user profile creation
- Session management with middleware
- Protected routes

---

## Project Management
- Create and manage projects
- Set project descriptions
- Update project status
  - Active
  - Archived
  - Completed
- Invite team members to projects

---

## Sprint Management
- Create sprints within projects
- Set sprint dates
- Manage sprint status
  - Planning
  - Active
  - Completed
- Organize tasks by sprint

---

## Task Management
- Create and manage tasks
- Assign tasks to team members
- Set task priorities
- Track estimated and spent hours
- Kanban board workflow

### Task Priorities
- Low
- Medium
- High
- Urgent

### Task Status
- To Do
- In Progress
- In Review
- Completed

---

## Team Collaboration
- Add members to projects
- Assign roles:
  - Admin
  - Manager
  - Member
- View project activity logs
- Collaborate through task updates

---

# Tech Stack

| Technology | Usage |
|---|---|
| Next.js 16 | Frontend Framework |
| React | UI Development |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| MongoDB | Database |
| JWT Auth | Authentication |
| React Hook Form | Form Management |
| Zod | Validation |

---

# Prerequisites

Before running the project, make sure you have installed:

- Node.js
- pnpm
- MongoDB

---

# Environment Configuration

## Step 1: Configure Backend Environment Variables

Go to the backend project and update the `.env` file using `env.example`.

```env
DATABASE_URL=
NODE_ENV=
PORT=
JWT_ACCESS_EXPIRES_IN=
JWT_ACCESS_SECRET=
JWT_REFRESH_EXPIRES_IN=
JWT_REFRESH_SECRET=