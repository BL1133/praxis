'use client';
import { useAuth } from '@providers/auth';
import Link from 'next/link';

export default function Home() {
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
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in to see your email.</p>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}
