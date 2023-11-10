import { User } from '@payloadTypes';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';

import { handleApiError } from '@/utils/apiErrors';

import { UserProfile } from './client_page';

interface ParamsType {
  params: { username: string };
}

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getUserId = async ({
  username,
}: {
  username: string;
}): Promise<string> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/username/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      await handleApiError(res);
    }
    const userData = await res.json();
    return userData.docs[0].id;
  } catch (e) {
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

const getUser = async (userId: string): Promise<User> => {
  const cookieStore = cookies();
  const payloadToken = cookieStore.get('payload-token');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `payload-token=${payloadToken?.value}`,
          'X-Custom-Note': 'getUser',
        },
      },
    );
    if (!res.ok) {
      await handleApiError(res);
    }
    const userData = await res.json();

    return userData;
  } catch (e) {
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

const Page: React.FC<ParamsType> = async ({ params }) => {
  const userId = await getUserId(params);
  const userData = await getUser(userId);
  return <UserProfile userData={userData} />;
};

export const metadata: Metadata = {
  title: 'Project | App',
  description: 'Project Page',
};

export default Page;
