import { User } from '@payloadTypes';
import { Metadata } from 'next';
import React from 'react';

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
      `${process.env.NEXT_PUBLIC_CMS_URL_NO_PROXY}/api/users/username/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }
    const userData = await res.json();
    return userData.docs[0].id;
  } catch (e) {
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

const getUser = async (userId: string): Promise<User> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL_NO_PROXY}/api/users/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
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
