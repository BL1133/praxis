'use client';
import React, { useEffect, useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';

export const Settings: React.FC = () => {
  const { data: fetchedData } = useUser();
  const { user } = fetchedData || {};
  const [data, setData] = useState(
    user || { username: '', firstName: '', lastName: '', email: '' },
  );

  const [error, setError] = useState(null);

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const myStyle = {
    color: 'black', // Note the camelCase
  };

  return (
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
  );
};
