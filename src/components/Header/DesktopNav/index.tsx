'use client';
import { Avatar } from '@components/Avatar';
import Link from 'next/link';

import { useUser } from '@/lib/hooks/useUser'; // Update this import path to where your useUser hook is located

export const Header = () => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      {user ? (
        <Avatar />
      ) : (
        <>
          <p>Please log in to see your email.</p>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
};
