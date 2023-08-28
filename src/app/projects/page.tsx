import { Project } from '@payloadTypes';
import { Metadata } from 'next';

import { Projects } from './client_page';

export interface ProjectResponse {
  docs: Project[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getProjects = async (): Promise<ProjectResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
