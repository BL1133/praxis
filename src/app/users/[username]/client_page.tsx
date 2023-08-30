'use client';
import { User } from '@payloadTypes';
import React, { useEffect, useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';

export const UserProfile: React.FC<{ userData: User }> = ({ userData }) => {
  const { data } = useUser();
  const isOwnProfile = data?.user && data?.user.id === userData.id;
  const [isPublicView, setIsPublicView] = useState(!isOwnProfile);

  const toggleViewMode = () => {
    setIsPublicView(!isPublicView);
  };

  useEffect(() => {
    if (data?.user && isOwnProfile) {
      setIsPublicView(false);
    }
  }, [data, isOwnProfile]);

  return (
    <div>
      {isOwnProfile && (
        <button onClick={toggleViewMode}>
          {isPublicView ? 'Switch to Private View' : 'Switch to Public View'}
        </button>
      )}
      {isPublicView ? (
        <div>
          <h1>{userData.username}</h1>
          <h1>{userData.firstName}</h1>
          <h1>{userData.lastName}</h1>
        </div>
      ) : (
        <div>
          <h1>{userData.username}</h1>
          <h1>{userData.firstName}</h1>
          <h1>{userData.lastName}</h1>
          <h1>{userData.email}</h1>
        </div>
      )}
    </div>
  );
};
