import { Metadata } from 'next';

import { Settings } from './client_page';

export default async function Page() {
  return <Settings />;
}

export const metadata: Metadata = {
  title: 'Settings | App',
  description: 'Profile and site settings',
};
