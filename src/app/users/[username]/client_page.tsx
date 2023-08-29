'use client';
import { User } from '@payloadTypes';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/providers/auth';

export const UserProfile: React.FC<{ userData: User }> = ({ userData }) => {
  const { user } = useAuth();
  const isOwnProfile = user && user.id === userData.id;
  const [isPublicView, setIsPublicView] = useState(!isOwnProfile);
  const userId = userData.id;

  const toggleViewMode = () => {
    setIsPublicView(!isPublicView);
  };

  useEffect(() => {
    if (user && isOwnProfile) {
      setIsPublicView(false);
    }
  }, [user, isOwnProfile]);

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
