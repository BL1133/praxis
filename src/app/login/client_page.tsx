'use client';

import { useAuth } from '@providers/auth'; // Ensure this import is correct
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user, login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Redirect to home page if user is logged in
    fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`, {
      credentials: 'include', // important for cookies/sessions
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      redirect('/');
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);

    try {
      await login({ email, password });
      // You can redirect user or show a success message here
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message); // Displaying the error to the user
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
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
