'use client';
import { Avatar } from '@components/Avatar';
import Link from 'next/link';

import { useUser } from '@/lib/hooks/useUser';

export const Header = () => {
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      <span>
        <Link href="/">Home </Link>
        <Link href="/projects">Projects </Link>
        {!data.user && <Link href="/signup">Sign Up </Link>}
        {data?.user && (
          <span>
            <Link href={`/users/${data?.user?.username}`}>Profile </Link>
            <Link href="/projects/create">Create </Link>
            <Link href="/settings">Settings </Link>
          </span>
        )}
      </span>
      <div>
        {data?.user ? (
          <Avatar />
        ) : (
          <>
            <p>Please log in to see your email.</p>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};
