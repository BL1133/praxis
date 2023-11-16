'use client';
import React, { useEffect, useState } from 'react';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { useUser } from '@/lib/hooks/useUser';
import { handleApiError } from '@/utils/apiErrors';

export const Settings: React.FC = () => {
  const { data: fetchedData, mutate } = useUser();
  const { user } = fetchedData || {};
  const [data, setData] = useState(
    user || { username: '', firstName: '', lastName: '', email: '' },
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, firstName, lastName, email } = data;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/${data.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
          }),
          credentials: 'include',
        },
      );

      if (res.ok) {
        setError(null);
        await mutate();
      }

      if (!res.ok) {
        await handleApiError(res);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const myStyle = {
    color: 'black',
  };

  return (
    <LoadingProtected>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleUpdateUser}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              style={myStyle}
              id="username"
              type="text"
              value={data?.username || ''}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              style={myStyle}
              id="firstName"
              type="text"
              value={data?.firstName || ''}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              style={myStyle}
              id="lastName"
              type="text"
              value={data?.lastName || ''}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              style={myStyle}
              id="email"
              type="email"
              value={data?.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div>
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    </LoadingProtected>
  );
};
