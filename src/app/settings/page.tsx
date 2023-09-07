import { User } from '@payloadTypes';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Settings } from './client_page';

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getUser = async (): Promise<User> => {
  const cookieStore = cookies();
  const payloadToken = cookieStore.get('payload-token');
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `payload-token=${payloadToken?.value}`,
        'X-Custom-Note': 'getUser',
      },
      next: {
        revalidate: 10, // 10 seconds
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }
    const userData = await res.json();
    return userData.user;
  } catch (e) {
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

export default async function Page() {
  const user = await getUser();
  return <Settings user={user} />;
}

export const metadata: Metadata = {
  title: 'Settings | App',
  description: 'Profile and site settings',
};
