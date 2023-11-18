'use client';

import { Project } from '@payloadTypes';
import Link from 'next/link';
import React from 'react';
import { GetProjectsResponse } from 'types';

import { ProjectSkillsWanted } from '@/components/ProjectSkillsWanted';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectTitleAndDescription } from '@/components/ProjectTitleAndDescription';
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
          className="w-10/12 bg-white dark:bg-gray-800  shadow-elevation-medium rounded-lg p-8"
        >
          <ProjectTitleAndDescription projectData={project} />
          <div className="flex gap-8">
            <ProjectSkillsWanted projectData={project} />
            <ProjectTags projectData={project} />
          </div>
          {/* Changed this to a <p> tag for semantic correctness */}
          <Link href={`/projects/${project.id}`}>See Project</Link>
        </div>
      ))}
    </div>
  );
};
