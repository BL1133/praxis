import { Metadata } from 'next';

import { Login } from './client_page';

export default function Page() {
  return <Login />;
}

export const metadata: Metadata = {
  title: 'Login | App',
  description: 'Login to App',
};
