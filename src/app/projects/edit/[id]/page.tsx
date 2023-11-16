import { Project } from '@payloadTypes';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleApiError, NotFoundError } from '@/utils/apiErrors';
import { getTags } from '@/utils/apiUtils';

import { EditProject } from './client_page';

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
          revalidate: 180, // 3 minutes
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

export default async function Page({ params }: { params: { id: string } }) {
  const fetchedTags = await getTags();
  const projectData = await getProject(params);
  return <EditProject projectData={projectData} fetchedTags={fetchedTags} />;
}

export const metadata: Metadata = {
  title: 'Edit Project | App',
  description: 'Edit your project',
};
