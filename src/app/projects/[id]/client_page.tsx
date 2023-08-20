'use client';
import React from 'react';

import { ProjectData } from './page';

interface ProjectProps {
  projectData: ProjectData;
}

export const Project: React.FC<ProjectProps> = ({ projectData }) => {
  return (
    <div>
      <h1>{projectData.title}</h1>
      <h1>{projectData.description}</h1>
    </div>
  );
};
