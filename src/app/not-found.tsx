import React from 'react';

import { BadStatusPage } from '@/components/BadStatusPage';

export default function NotFound() {
  return <BadStatusPage statusCode={404} />;
}
