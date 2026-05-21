import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-background/80 backdrop-blur">
        <h1 className="text-2xl font-bold text-foreground">MPMS</h1>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-5xl font-bold text-foreground text-balance">
            Multi-Project Management System
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Manage your projects, sprints, and tasks all in one place. Collaborate with your team and track progress in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <p className="text-sm text-muted-foreground">Create and manage multiple projects with your team</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Sprints</h3>
              <p className="text-sm text-muted-foreground">Organize work into sprints and plan iterations</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Tasks</h3>
              <p className="text-sm text-muted-foreground">Track tasks with kanban boards and time tracking</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link href="/auth/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
