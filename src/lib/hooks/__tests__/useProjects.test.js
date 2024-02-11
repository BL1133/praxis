// Mocking the useRouter hook:
// This mock replaces the real useRouter hook with a custom implementation that returns a mocked push function, allowing the test to verify navigation behavior without actually changing the URL during the test.

// wrapper:
// Wrap Projects in SWRConfig for tests to provide fallback data
// Purpose: The wrapper function is a higher-order component that wraps the Projects component with SWRConfig from SWR. This setup allows you to specify a custom cache provider (new Map()) for SWR, effectively isolating tests by providing a clean slate for SWR's cache in each test run. It's particularly useful for components that use SWR for data fetching, as it ensures tests don't interfere with each other's cache.

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from '@/app/projects/client_page';
import { SWRConfig } from 'swr';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const wrapper = ({ children }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe('Projects Page', () => {
  it('renders correctly and displays projects', async () => {
    render(<Projects projects={{ projects: [] }} />, { wrapper });

    // Check for initial loading state, if applicable. Spinner is aria-label on Loading component
    expect(screen.getByLabelText('spinner')).toBeInTheDocument();

    // Wait for loading to complete and assert the rendered projects
    await waitFor(() => expect(screen.queryByLabelText('spinner')).toBeNull());
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  // Add more tests for filtering functionality, form submission, etc.
});
