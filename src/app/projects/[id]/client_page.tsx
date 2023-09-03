/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Project } from '@payloadTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { mutate } from 'swr';

import { useProject } from '@/lib/hooks/useProject';
import { useUser } from '@/lib/hooks/useUser';

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
    console.log(e as Error);
    throw new Error(`Failed to delete project: ${(e as Error).message}`);
  }
};

export const ProjectClient: React.FC<ProjectProps> = ({
  projectData: initialData,
}) => {
  const router = useRouter();
  const { data: userData } = useUser();
  const { data: projectData, mutate: mutateProject } = useProject(initialData);
  const isOwnProject =
    userData?.user &&
    (typeof projectData?.createdBy === 'object'
      ? projectData?.createdBy?.id === userData?.user?.id
      : projectData?.createdBy === userData?.user?.id);

  return (
    <div>
      <h1>{projectData.title}</h1>
      <h1>{projectData.description}</h1>
      {isOwnProject && <h1>Created by you</h1>}
      {isOwnProject && (
        <div>
          <Link href={`/projects/edit/${projectData.id}`}>Edit | </Link>
          <button
            onClick={() => {
              handleDelete(projectData.id, mutateProject, mutate, router);
            }}
          >
            Delete Project
          </button>
        </div>
      )}
    </div>
  );
};
