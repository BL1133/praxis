import { Metadata } from 'next';
import React from 'react';

import { Project } from './client_page';

interface ParamsType {
  params: { id: string };
}

export type ProjectData = {
  title: string;
  description: string;
  createdBy: string;
};

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getProject = async ({ id }: { id: string }): Promise<ProjectData> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL_NO_PROXY}/api/projects/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.statusText}`);
    }
    const projectData = await res.json();
    return projectData;
  } catch (e) {
    console.log(e as Error);
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

const Page: React.FC<ParamsType> = async ({ params }) => {
  const projectData = await getProject(params);
  return <Project projectData={projectData} />;
};

export const metadata: Metadata = {
  title: 'Project | App',
  description: 'Project Page',
};

export default Page;
