'use client';
// Ensure this import is correct
// Used for navigation
import React, { useState } from 'react';

export const CreateProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // const { user } = useAuth();

  // Redirect if user is not logged in
  // useEffect(() => {
  //   if (!user) {
  //     redirect('/'); // Redirect to login page if user is not authenticated
  //   }
  // }, [user]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
          }),
          credentials: 'include',
        },
      );

      if (res.ok) {
        setTitle('');
        setDescription('');
        setError(null);
      }

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.error || 'Failed to create project.');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const myStyle = {
    color: 'black', // Note the camelCase
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateProject}>
        <div>
          <label htmlFor="title">Project Title:</label>
          <input
            style={myStyle}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            style={myStyle}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create Project</button>
        </div>
      </form>
    </div>
  );
};
