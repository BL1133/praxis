import { Metadata } from 'next';

import { Projects } from './client_page';

export default function Page() {
  return <Projects />;
}

export const metadata: Metadata = {
  title: 'Project Listings | App',
  description: 'Project Listings | App',
};
