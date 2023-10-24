import { Metadata } from 'next';

import { getTags } from '@/utils/apiUtils';

import { CreateProject } from './client_page';

export default async function Page() {
  const fetchedTags = await getTags();
  return <CreateProject fetchedTags={fetchedTags} />;
}

export const metadata: Metadata = {
  title: 'Create Project | App',
  description: 'Create your project',
};
