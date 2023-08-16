'use client';
import { Avatar } from '@components/Avatar';
import { useAuth } from '@providers/auth';
import Link from 'next/link';

export const Header = () => {
  const { user } = useAuth();

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
