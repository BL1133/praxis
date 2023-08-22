'use client';

import { Project } from '@payloadTypes';
import React from 'react';

import { ProjectResponse } from './page';

export const Projects: React.FC<{ projects: ProjectResponse }> = ({
  projects,
}) => {
  return projects.docs.map((project: Project) => (
    <div key={project.id}>
      <h1>{project.title}</h1>
      <h1>{project.description}</h1>
    </div>
  ));
};
