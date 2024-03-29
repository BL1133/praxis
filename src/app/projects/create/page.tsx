import { Metadata } from 'next';

import { CreateProject } from './client_page';

export default async function Page() {
  return <CreateProject />;
}

export const metadata: Metadata = {
  title: 'Create Project | App',
  description: 'Create your project',
};
