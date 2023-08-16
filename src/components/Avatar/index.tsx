import { useAuth } from '@providers/auth';
import Link from 'next/link';
import React from 'react';

export const Avatar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // You can display a message or perform additional logic after a successful logout, if desired
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Link href={`/`}>
        <p>Welcome, {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
};
