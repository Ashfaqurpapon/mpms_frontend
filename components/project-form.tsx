// 'use client';

// import { use, useState } from 'react';
// import { createClient } from '@/lib/supabase/client';
// import { createProject } from '@/lib/api';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/auth-context';
// import { api } from '@/lib/api-lib';

// export function ProjectForm() {
//   const router = useRouter();
//   const supabase = createClient();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//   });
//   const { user } = useAuth();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {


//       if (!user) {
//         throw new Error('Not authenticated');
//       }
       
       
//       const project = {
//         name: formData.name,
//         description: formData.description,
//         owner_id: user.id,
//         status: 'active',
//       };
//       const result: any = await api.createProject(project);

//       router.push(`/projects/${result._id}`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to create project');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl">
//       <CardHeader>
//         <CardTitle>Create New Project</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
//               {error}
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Project Name
//             </label>
//             <Input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter project name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description
//             </label>
//             <Textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter project description"
//               rows={4}
//             />
//           </div>

//           <div className="flex gap-4">
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Creating...' : 'Create Project'}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => router.back()}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/lib/api-lib';

export function ProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    description: '',
    start_date: '',
    end_date: '',
    budget: '',
    thumbnail: '',
    status: 'planned',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!user) throw new Error('Not authenticated');

      const project = {
        title: formData.title,
        client: formData.client,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        budget: Number(formData.budget),
        thumbnail: formData.thumbnail || null,
        status: formData.status,
        owner_id: user.id,
      };

      const result: any = await api.createProject(project);

      router.push(`/projects/${result._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              {error}
            </div>
          )}

          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />

          <Input
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Client Name"
            required
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
          />

          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />

          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            
          />

          <Input
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL (optional)"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>

            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}