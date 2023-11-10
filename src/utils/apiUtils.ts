import { ProjectInputs } from 'types';

import { handleApiError } from './apiErrors';

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
      await handleApiError(res);
    }
    const projectsData = await res.json();
    return projectsData;
  } catch (e) {
    console.error(e as Error);
    throw new Error(`${CONNECTION_ERROR}: ${(e as Error).message}`);
  }
};
