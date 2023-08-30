import Link from 'next/link';
import React from 'react';

import { useUser } from '@/lib/hooks/useUser';

export const Avatar: React.FC = () => {
  const { data, logout } = useUser();

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
        <p>Welcome, {data?.user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
};
