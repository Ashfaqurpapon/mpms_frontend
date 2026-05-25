'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api-lib';
import { useAuth } from '@/contexts/auth-context';

export default function ProfilePage() {
  const { user: authUser } = useAuth();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        if (!authUser?.email) return;

        const res = await api.getUserByEmail({
          email: authUser.email,
        });

        setUser(res);

        setFormData({
          full_name: res?.full_name || '',
        });

      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [authUser]);

  const handleSave = async () => {
    // if (!user) return;

    // try {
    //   setLoading(true);

    //   await api.updateUser({
    //     id: user._id,
    //     full_name: formData.full_name,
    //   });

    //   setUser({
    //     ...user,
    //     full_name: formData.full_name,
    //   });

    //   setEditing(false);
    // } catch (error) {
    //   console.error('Failed to update profile:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
           Your profile information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <Input
              value={authUser?.email || ''}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Full Name */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            {editing ? (
              <Input
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ full_name: e.target.value })
                }
              />
            ) : (
              <Input
                value={formData.full_name}
                disabled
                className="bg-gray-50"
              />
            )}
          </div> */}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Role
            </label>

            <Input
              value={user?.role || ''}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">

            {/* {editing ? (
              <>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )} */}

          </div>

        </CardContent>
      </Card>

    </div>
  );
}