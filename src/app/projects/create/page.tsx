import { Metadata } from 'next';
import { Inputs } from 'types';

import { CreateProject } from './client_page';

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

const getTags = async (): Promise<Inputs['tags']> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/tags`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60, // 60 seconds
        },
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch projects in getTags function: ${res.statusText}`,
      );
    }
    const projectsData = await res.json();
    return projectsData;
  } catch (e) {
    console.log(e as Error);
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};

export default async function Page() {
  const tags = await getTags();
  return <CreateProject tags={tags} />;
}

export const metadata: Metadata = {
  title: 'Create Project | App',
  description: 'Create your project',
};
