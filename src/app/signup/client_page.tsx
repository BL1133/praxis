'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';
import { handleApiError } from '@/utils/apiErrors';

export const SignUp: React.FC = () => {
  const router = useRouter();
  const { data } = useUser();
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (res.ok) {
        setEmail('');
        setPassword('');
        setUsername('');
        setError(null);
        router.push('/');
      }

      if (!res.ok) {
        await handleApiError(res);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (data?.user) {
    return <h1>You must first logout to create another account.</h1>;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            style={{ color: 'black' }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            style={{ color: 'black' }}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            style={{ color: 'black' }}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
