/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Project } from '@payloadTypes';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useProject } from '@/lib/hooks/useProject';
import { useUser } from '@/lib/hooks/useUser';
import { useSidebarContext } from '@/providers/SidebarContext';

import { Description } from './components/description';
import { Header } from './components/header';
interface ProjectProps {
  projectData: Project;
}

// eslint-disable-next-line
const handleDelete = async (
  id: string | undefined,
  mutateProject: any,
  mutate: any,
  router: any,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to delete project: ${res.statusText}`);
    }
    const response = await res.json();

    if (res) {
      await mutate('/api/projects');
      mutateProject();
      router.push('/projects');
    }
    return response;
  } catch (e) {
    console.error(e as Error);
    throw new Error(`Failed to delete project: ${(e as Error).message}`);
  }
};

export const ProjectClient: React.FC<ProjectProps> = ({
  projectData: initialData,
}) => {
  const { isOpen: isSidebarOpen } = useSidebarContext();
  const router = useRouter();
  const { data: userData } = useUser();
  const { data: projectData, mutate: mutateProject } = useProject(initialData);
  const isOwnProject =
    userData?.user &&
    (typeof projectData?.createdBy === 'object'
      ? projectData?.createdBy?.id === userData?.user?.id
      : projectData?.createdBy === userData?.user?.id);

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
