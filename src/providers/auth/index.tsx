'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { User } from '../../../payload-types';

// Types ---------------------------------------------------------------------
type Login = (args: { email: string; password: string }) => Promise<User>;
type Logout = () => Promise<void>;

type AuthContextType = {
  user: User | null;
  login: Login;
  logout: Logout;
};

// Context -------------------------------------------------------------------
const AuthContext = createContext({} as AuthContextType);

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const fetchedMe = useRef(false);

  useEffect(() => {
    if (fetchedMe.current) return;
    fetchedMe.current = true;

    const fetchMe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
          {
            method: 'GET',
            credentials: 'include', // important for cookies/sessions
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (!res.ok) {
          throw new Error('Server response was not ok.');
        }

        const data = await res.json();

        if (data && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchMe();
  });

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: args.email, password: args.password }),
        },
      );

      const { user } = await res.json();

      if (res.ok) {
        setUser(user);
        return user; // returning the user here to adhere to the Login type
      } else {
        const errorResponse = await res.json();
        throw new Error(errorResponse.errors[0].message);
      }
    } catch (e) {
      throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
    }
  }, []);

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
        setUser(null);
      }
    } catch (e) {
      throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
