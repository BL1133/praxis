'use client';
import { User } from '@payloadTypes';
import { useCallback } from 'react';
import useSWR from 'swr';

import { fetcherAuth } from '@/utils/fetcher';

type Login = (args: { email: string; password: string }) => Promise<User>;
type Logout = () => Promise<void>;

export const useUser = () => {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
    fetcherAuth,
    {
      refreshInterval: 10000,
    },
  );
  const login = useCallback<Login>(
    async (args) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: args.email,
              password: args.password,
            }),
          },
        );

        const { user } = await res.json();

        if (res.ok) {
          mutate(user);
          return user;
        } else {
          const errorResponse = await res.json();
          throw new Error(errorResponse.errors[0].message);
        }
      } catch (e) {
        throw new Error(`Connection error: ${(e as Error).message}`);
      }
    },
    [mutate],
  );

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.ok) {
        mutate(null);
      }
    } catch (e) {
      throw new Error(`Connection error: ${(e as Error).message}`);
    }
  }, [mutate]);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    login,
    logout,
  };
};
