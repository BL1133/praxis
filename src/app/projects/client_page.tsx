'use client';

import { Project } from '@payloadTypes';
import Link from 'next/link';
import React from 'react';
import { ProjectResponse } from 'types';

import { useProjects } from '@/lib/hooks/useProjects';

export const Projects: React.FC<{ projects: ProjectResponse }> = ({
  projects,
}) => {
  const { data, isError, isLoading } = useProjects(projects);

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <div>Loading projects...</div>;

  return data.docs.map((project: Project) => (
    <div key={project.id}>
      <h1>{project.title}</h1>
      <h1>{project.description}</h1>
      <Link href={`/projects/${project.id}`}>See Project</Link>
    </div>
  ));
};
