'use client';
import { Project } from '@payloadTypes';
import React from 'react';

interface ProjectProps {
  projectData: Project;
}

export const ProjectClient: React.FC<ProjectProps> = ({ projectData }) => {
  return (
    <div>
      <h1>{projectData.title}</h1>
      <h1>{projectData.description}</h1>
    </div>
  );
};
