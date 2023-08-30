'use client';

import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading, isError, login } = useUser();

  useEffect(() => {
    if (data?.user) {
      redirect('/');
    }
  }, [data]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      // You can redirect user or show a success message here
      // setIsLoggedIn(true);
    } catch (err) {
      setError((err as Error).message); // Displaying the error to the user
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email" // <-- Add ID here
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password" // <-- Add ID here
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
