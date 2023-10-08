import { Metadata } from 'next';
import { GetProjectsResponse } from 'types';

import { Projects } from './client_page';

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getProjects = async (): Promise<GetProjectsResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60, // 60 seconds
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }
    const projectsData = await res.json();
    return projectsData;
  } catch (e) {
    console.log(e as Error);
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

export default async function Page() {
  const projectsData = await getProjects();
  return <Projects projects={projectsData} />;
}

export const metadata: Metadata = {
  title: 'Project Listings | App',
  description: 'Project Listings | App',
};
