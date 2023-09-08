import { Metadata } from 'next';

import { Settings } from './client_page';

const CONNECTION_ERROR =
  'CONNECTION_ERROR. An error occurred while attempting to connect to MongoDB';

export default async function Page() {
  return <Settings />;
}

export const metadata: Metadata = {
  title: 'Settings | App',
  description: 'Profile and site settings',
};
