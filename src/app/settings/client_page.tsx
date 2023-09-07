'use client';
import { User } from '@payloadTypes';
import React, { useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';

export const Settings: React.FC<{ user: User }> = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const { data } = useUser(user);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const myStyle = {
    color: 'black', // Note the camelCase
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdateUser}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            style={myStyle}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            style={myStyle}
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            style={myStyle}
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={myStyle}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};
