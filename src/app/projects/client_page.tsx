'use client';

/**
 * `Projects` React Component
 *
 * Overview:
 * This React component is designed to display a list of projects. It also provides tag-based filtering functionality for the projects.
 * Router.push adds query string to the URL to filter projects based on selected tags.
 * useEffect hook updates the 'query' state when 'searchParams' change, triggering a refetch of project data as needed.
 *
 * Imports:
 * - useProjects: A custom hook for fetching project data. Query is passed into this hook to fetch projects based on tag filters.
 * - TagsFormInputs, useTagsFilterContext: Context provider imports for managing tag filter state.
 *
 * Props:
 * - projects (GetProjectsResponse): Initial data for the projects.
 *
 * State Management:
 * - query (string): Represents the current query for fetching projects.
 * - data, isError, isLoading: Variables from useProjects for project data, loading, and error states.
 * - isFilterOpen (boolean): Controls the visibility of the tags filter.
 *
 * Key Functions:
 * - createQueryString(tags: string[]): Generates a query string for project filtering. Returns an empty string if no tags are selected.
 *
 * Effects:
 * - A useEffect hook that updates the 'query' state when 'searchParams' change, triggering a refetch of project data as needed.
 *
 * Usage:
 * This component renders a list of projects, offering tag-based filtering functionality. Users can select tags to refine the displayed projects.
 */

import { Project } from '@payloadTypes';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { GetProjectsResponse } from 'types';

import { Loading } from '@/components/LoadingPage';
import { ProjectSkillsWanted } from '@/components/ProjectSkillsWanted';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectTitleAndDescription } from '@/components/ProjectTitleAndDescription';
import { Tags } from '@/components/Tags';
import { useProjects } from '@/lib/hooks/useProjects';
import {
  TagsFormInputs,
  useTagsFilterContext,
} from '@/providers/TagsFilterContext';

export const Projects: React.FC<{ projects: GetProjectsResponse }> = ({
  projects,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('tags') || '');
  const { data, isError, isLoading } = useProjects(projects, query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { loading, success, tagsRef, handleSubmit, errors, reset } =
    useTagsFilterContext();

  const handleFiltering: SubmitHandler<TagsFormInputs> = async (data) => {
    if (data.tags && data.tags.length > 0) {
      const newQuery = data.tags.join(',');
      setQuery(newQuery);
      // Update the URL to reflect the new filters without reloading the page
      router.push(`/projects?tags=${newQuery}`);
    } else {
      setQuery('');
      router.push('/projects');
    }
  };

  function clearAllFilters() {
    setQuery('');
    router.push('/projects');
    reset();
  }

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <Loading />;

  return (
    // To have gradient background on this page requires the margin and padding trickery below.Can't have it on layout because it affects all project pages. Also dark-bg makes background:none on dark mode which has dark class on html element
    <div
      className={`flex flex-col-reverse lg:flex-row gradient-bg dark-bg relative -mx-4 lg:-mx-10 px-4 sm:px-10`}
    >
      <div className="flex flex-col gap-5 lg:mt-10 mt-5 pb-20 lg:w-9/12">
        {data?.docs?.length ? (
          data?.docs?.map((project: Project) => (
            <div
              key={project.id}
              className="lg:mr-10 bg-white dark:bg-gray-800  shadow-elevation-medium rounded-lg p-8"
            >
              <ProjectTitleAndDescription projectData={project} />
              <div className="flex gap-8">
                <ProjectSkillsWanted projectData={project} />
                <ProjectTags projectData={project} />
              </div>
              <Link
                href={`/projects/${project.id}`}
                className=" text-gray-500 p-2 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 inline-block"
              >
                <p className="text-md font-semibold mt-0.5 text-cyan-600 dark:text-cyan-600">
                  See Project
                </p>
              </Link>
            </div>
          ))
        ) : (
          <h1>No projects found.</h1>
        )}
      </div>
      <div
        className={`mt-10 w-full lg:w-3/12 lg:sticky lg:block ${
          isFilterOpen ? ' block top-20 right-5 w-11/12' : 'hidden'
        }`}
      >
        {/* Tags filter ======================== */}
        <form onSubmit={handleSubmit(handleFiltering)}>
          <Tags
            tagsRef={tagsRef}
            loading={loading}
            success={success}
            errors={errors}
          />
          <div className="flex gap-4 mt-5">
            <Button
              type="submit"
              disabled={isLoading || success ? true : false}
              size="md"
              isProcessing={isLoading}
              processingSpinner={
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
            >
              Filter
            </Button>
            <Button
              size="md"
              disabled={isLoading || success ? true : false}
              onClick={clearAllFilters}
              isProcessing={isLoading}
              color="red"
              processingSpinner={
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
            >
              Clear all
            </Button>
          </div>
        </form>
      </div>
      <div className="lg:hidden mt-10 flex ">
        <Button
          size="md"
          className="ml-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};
