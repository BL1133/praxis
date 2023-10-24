import { ProjectInputs } from 'types';

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

export const getTags = async (): Promise<ProjectInputs['tags']> => {
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
