/**
 * @fileoverview Renders the project page for a specific project ID.
 * @module ProjectPageServerSide
 * @param {Object} params - The parameters object containing the project ID.
 * @param {string} params.id - The ID of the project to be rendered.
 * @returns {JSX.Element} - The JSX element representing the project page.
 */

import { Project } from '@payloadTypes';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { ProjectSidebar } from '@/components/ProjectSidebar';
import { handleApiError, NotFoundError } from '@/utils/apiErrors';

import { ProjectClient } from './client_page';

interface ParamsType {
  params: { id: string };
}

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getProject = async ({ id }: { id: string }): Promise<Project> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 1, // 10 seconds
        },
      },
    );
    if (!res.ok) {
      await handleApiError(res);
    }
    const projectData = await res.json();
    return projectData;
  } catch (e) {
    if ((e as Error) instanceof NotFoundError) throw notFound();
    throw new Error(`${(e as Error).name}: ${(e as Error).message}`);
  }
};

const Page: React.FC<ParamsType> = async ({ params }) => {
  const projectData = await getProject(params);
  return (
    <div className="flex items-start">
      <ProjectSidebar />
      <ProjectClient projectData={projectData} />
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Project | App',
  description: 'Project Page',
};

export default Page;
