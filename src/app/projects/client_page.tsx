'use client';

import { Project } from '@payloadTypes';
import Link from 'next/link';
import React from 'react';
import { GetProjectsResponse } from 'types';

import { useProjects } from '@/lib/hooks/useProjects';

export const Projects: React.FC<{ projects: GetProjectsResponse }> = ({
  projects,
}) => {
  const { data, isError, isLoading } = useProjects(projects);

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <div>Loading projects...</div>;

  return (
    <div className="flex flex-col place-items-center gap-5 mt-10">
      {data.docs.map((project: Project) => (
        <div
          key={project.id}
          className="w-10/12 bg-white dark:bg-gray-800  shadow-elevation-medium rounded-lg"
        >
          <h1>{project.title}</h1>
          <p>{project.shortDescription}</p>{' '}
          {/* Changed this to a <p> tag for semantic correctness */}
          <Link href={`/projects/${project.id}`}>See Project</Link>
        </div>
      ))}
    </div>
  );
};
