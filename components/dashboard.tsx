// 'use client';

// import { useState, useEffect } from 'react';
// import { createClient } from '@/lib/supabase/client';
// import { getProjects } from '@/lib/api';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Link from 'next/link';
// import { Plus } from 'lucide-react';
// import { api } from '@/lib/api-lib';
// import { useAuth } from '@/contexts/auth-context';

// export function Dashboard() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const supabase = createClient();
//   const { user } = useAuth();



//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         setLoading(true);
//         const data = await api.getAllProducts();

//         setProjects(data.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load projects');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProjects();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center py-12">Loading...</div>;
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
//           <p className="text-muted-foreground mt-2">Manage your projects and teams</p>
//         </div>
//         {user?.role === "admin" || user?.role === "manager" ? (
//           <Link href="/projects/new">
//             <Button className="gap-2">
//               <Plus className="w-4 h-4" />
//               New Project
//             </Button>
//           </Link>
//         ) : (
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             {/* <Lock className="w-4 h-4" />
//             <span>Only admins can create projects</span> */}
//           </div>
//         )}
//       </div>

//       {error && (
//         <Card className="border-red-500 bg-red-50">
//           <CardContent className="pt-6">
//             <p className="text-red-800">{error}</p>
//           </CardContent>
//         </Card>
//       )}

//       {projects.length === 0 ? (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <p className="text-muted-foreground mb-4">No projects yet</p>
//             <Link href="/projects/new">
//               <Button>Create your first project</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {projects.map((project) => (
//             <Link key={project._id} href={`/projects/${project._id}`}>
//               <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
//                 <CardHeader>
//                   <CardTitle className="line-clamp-2">{project.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground line-clamp-2">
//                     {project.description || 'No description'}
//                   </p>
//                   <div className="mt-4">
//                     <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                       {project.status}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api-lib';
import { useAuth } from '@/contexts/auth-context';

interface Project {
  _id: string;
  title: string;
  client: string;
  description?: string;
  status: 'planned' | 'active' | 'completed' | 'archived';
}

export function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isMember = user?.role === 'member';

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);

        let res;

        if (isMember) {
          res = await api.getMyProject({
            email: user?.email as string,
          });

          // IMPORTANT: normalize response
          setProjects(res?.data ?? []);
        } else {
          res = await api.getAllProjects();
          setProjects(res?.data ?? []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        setProjects([]); // IMPORTANT fallback
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      loadProjects();
    }
  }, [user?.email, isMember]);
  // useEffect(() => {
  //   const loadProjects = async () => {
  //     try {
  //       setLoading(true);
  //       if (isMember) {



  //         var res = await api.getMyProject({
  //           email: user.email,
  //         }); // NOT getAllProjects

  //         console.log("res dhekbo",res);

  //         setProjects(res);
  //       } else {
  //         res = await api.getAllProjects();
  //         setProjects(res.data);
  //       }
  //       setProjects(res.data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Failed to load projects');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProjects();
  // }, []);
  const getProgress = (status: Project['status']) => {
    switch (status) {
      case 'planned':
        return 10;
      case 'active':
        return 60;
      case 'completed':
        return 100;
      case 'archived':
        return 100;
      default:
        return 0;
    }
  };


  const clients = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.client)));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const statusMatch = statusFilter === 'all' || p.status === statusFilter;
      const clientMatch = clientFilter === 'all' || p.client === clientFilter;
      return statusMatch && clientMatch;
    });
  }, [projects, statusFilter, clientFilter]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
    };
  }, [projects]);

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-8">

      {/* ADMIN / MANAGER VIEW */}
      {isAdmin || isManager ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-muted-foreground mt-2">
                Manage your projects and teams
              </p>
            </div>

            <Link href="/projects/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="shadow-md hover:shadow-xl transition-all border-l-4 border-blue-500">
              <CardContent className="p-4 bg-gradient-to-r from-blue-50 to-white">
                <p className="text-sm text-blue-600 font-medium">Total Projects</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">
                  {stats.total}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all border-l-4 border-green-500">
              <CardContent className="p-4 bg-gradient-to-r from-green-50 to-white">
                <p className="text-sm text-green-600 font-medium">Active Projects</p>
                <p className="text-3xl font-bold text-green-700 mt-1">
                  {stats.active}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all border-l-4 border-purple-500">
              <CardContent className="p-4 bg-gradient-to-r from-purple-50 to-white">
                <p className="text-sm text-purple-600 font-medium">Completed Projects</p>
                <p className="text-3xl font-bold text-purple-700 mt-1">
                  {stats.completed}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <select
              className="border rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
            >
              <option value="all">All Clients</option>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <Card className="border-red-500 bg-red-50">
              <CardContent className="pt-6 text-red-800">
                {error}
              </CardContent>
            </Card>
          )}

          {/* Empty */}
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No projects found
              </CardContent>
            </Card>
          ) : (
            <>
              {/* GRID VIEW */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Link key={project._id} href={`/projects/${project._id}`}>
                    <Card className="hover:shadow-lg transition">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>

                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {project.client}
                        </p>

                        <p className="text-sm mt-2 line-clamp-2">
                          {project.description || 'No description'}
                        </p>

                        <span className="inline-block mt-4 px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          {project.status}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* TABLE VIEW */}
              <div className="mt-10 overflow-x-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3">Title</th>
                      <th className="text-left p-3">Client</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProjects.map((p) => (
                      <tr key={p._id} className="border-t">
                        <td className="p-3">{p.title}</td>
                        <td className="p-3">{p.client}</td>
                        <td className="p-3">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        /* MEMBER VIEW */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.length > 0 ? (
            projects.map((project) => (
              <Link key={project._id} href={`/projects/${project._id}`}>
                <Card className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {project.client}
                    </p>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${getProgress(project.status)}%` }}
                        />
                      </div>

                      <p className="text-xs mt-1 text-muted-foreground">
                        Progress: {getProgress(project.status)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="p-10 text-center text-muted-foreground">
              You don’t have any projects assigned yet
            </Card>
          )}
        </div>
      )}

    </div>
  );
}