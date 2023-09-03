import { Project } from '@payloadTypes';
import { Metadata } from 'next';

import { EditProject } from './client_page';

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
          revalidate: 1, // 1 seconds
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

export default async function Page({ params }: { params: { id: string } }) {
  const projectData = await getProject(params);
  return <EditProject projectData={projectData} />;
}

export const metadata: Metadata = {
  title: 'Edit Project | App',
  description: 'Edit your project',
};
