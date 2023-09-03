'use client';
import { Project } from '@payloadTypes';
import React, { useState } from 'react';

import { useProject } from '@/lib/hooks/useProject';

interface ProjectProps {
  projectData: Project;
}

export const EditProject: React.FC<ProjectProps> = ({
  projectData: initialData,
}) => {
  const { data, mutate } = useProject(initialData);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [error, setError] = useState<string | null>(null);

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${data.id}`,
        {
          method: 'PATCH',
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
        setError(null);
        mutate();
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
      <form onSubmit={handleEditProject}>
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
          <button type="submit">Edit Project</button>
        </div>
      </form>
    </div>
  );
};
