import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Projects } from '@/app/projects/client_page';
import { SWRConfig } from 'swr';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Wrap Projects in SWRConfig for tests to provide fallback data
const wrapper = ({ children }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe('Projects Page', () => {
  it('renders correctly and displays projects', async () => {
    render(<Projects projects={{ projects: [] }} />, { wrapper });

    // Check for initial loading state, if applicable
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete and assert the rendered projects
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  // Add more tests for filtering functionality, form submission, etc.
});
