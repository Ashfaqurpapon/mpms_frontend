"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    

    if (!user) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}