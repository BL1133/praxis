import { Metadata } from 'next';

import { SignUp } from './client_page';

export default function Page() {
  return <SignUp />;
}

export const metadata: Metadata = {
  title: 'Signup | App',
  description: 'Sign in to App',
};
