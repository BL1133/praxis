/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Project } from '@payloadTypes';
import classNames from 'classnames';
import React from 'react';

import { useProject } from '@/lib/hooks/useProject';
import { useUser } from '@/lib/hooks/useUser';
import { useSidebarContext } from '@/providers/SidebarContext';
import { IsOwnProject } from '@/utils/isOwnProject';

import { Description } from './components/description';
import { Header } from './components/header';
interface ProjectProps {
  projectData: Project;
}

export const ProjectClient: React.FC<ProjectProps> = ({
  projectData: initialData,
}) => {
  const { isOpen: isSidebarOpen } = useSidebarContext();
  const { data: userData } = useUser();
  const { data: projectData } = useProject(initialData);
  const isOwnProject = IsOwnProject(userData, projectData);
  return (
    <div
      className={classNames(
        'overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16',
      )}
    >
      <Header
        isOwnProject={isOwnProject}
        projectData={projectData}
        userData={userData?.user}
      />
      <Description />
    </div>
  );
};
