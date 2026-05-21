'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  LogOut,
  User,
} from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">MPMS</h1>
        <p className="text-xs text-slate-400">Project Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:bg-slate-800"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
        </Link>

        <Link href="/projects">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:bg-slate-800"
          >
            <Briefcase className="w-5 h-5" />
            Projects
          </Button>
        </Link>

        <Link href="/profile">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:bg-slate-800"
          >
            <User className="w-5 h-5" />
            Profile
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="ghost"
          className="w-full justify-start gap-3 text-red-400 hover:bg-red-900/20"
        >
          <LogOut className="w-5 h-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </div>
  );
}
