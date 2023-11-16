/**
 * @fileoverview a BadStatusPage component with a prop of 404 to display a "Not Found" error page.
 * @returns JSX element
 * @module src/app/projects/not-found
 */
import React from 'react';

import { BadStatusPage } from '@/components/BadStatusPage';

export default function NotFound() {
  return <BadStatusPage statusCode={404} />;
}
