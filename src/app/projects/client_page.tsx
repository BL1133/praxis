'use client';

import { Project } from '@payloadTypes';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { GetProjectsResponse } from 'types';

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
  const [query, setQuery] = useState<string>('');
  const { data, isError, isLoading } = useProjects(projects, query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    loading,
    setLoading,
    success,
    setSuccess,
    submitErrors,
    setSubmitErrors,
    tagsRef,
    handleSubmit,
    errors,
  } = useTagsFilterContext();

  function createQueryString(tags: string[]) {
    if (tags.length === 0) return '';
    const query = { tags: { in: tags } };
    return qs.stringify(
      { where: query },
      { addQueryPrefix: true, arrayFormat: 'comma' },
    );
  }

  useEffect(() => {
    // const queryStr = searchParams.get('where[tags][in]');
    // const queryArr = queryStr ? queryStr.split(',') : [];
    // console.log('queryArr', queryArr);
    // const newQueryString = createQueryString(queryArr);
    // console.log('newQueryString', newQueryString); //TODO: Delete this?
    setQuery('?' + searchParams.toString());
  }, [searchParams]);

  /**
   * Handles the submission of the tags filtering form.
   * Constructs a query string based on selected tags and updates the URL.
   * If no tags are selected, it resets the query and navigates back to the base projects URL.
   *
   * @param {TagsFormInputs} data - The data from the form submission, containing selected tags
   */
  const handleFiltering: SubmitHandler<TagsFormInputs> = async (data) => {
    // setLoading(true);
    const stringifiedQuery = createQueryString(data.tags);
    if (data.tags && data.tags.length > 0) {
      router.push(stringifiedQuery);
    } else {
      router.push('/projects');
    }
    console.log('hi');
  };

  function clearAllFilters() {
    setLoading(false);
    setSuccess(null);
    setSubmitErrors([]);
  }

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <div>Loading projects...</div>;

  return (
    // To have gradient background on this page requires the margin and padding trickery below.Can't have it on layout because it affects all project pages. Also dark-bg makes background:none on dark mode which has dark class on html element
    <div
      className={`flex flex-col-reverse lg:flex-row gradient-bg dark-bg relative -mr-10 -ml-10 pr-10 pl-10`}
    >
      <div className="flex flex-col gap-5 lg:mt-10 mt-5 pb-20 lg:w-9/12">
        {data.docs.map((project: Project) => (
          <div
            key={project.id}
            className="lg:mr-10 bg-white dark:bg-gray-800  shadow-elevation-medium rounded-lg p-8"
          >
            <ProjectTitleAndDescription projectData={project} />
            <div className="flex gap-8">
              <ProjectSkillsWanted projectData={project} />
              <ProjectTags projectData={project} />
            </div>
            {/* Changed this to a <p> tag for semantic correctness */}
            <Link href={`/projects/${project.id}`}>See Project</Link>
          </div>
        ))}
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
      <div className="lg:hidden mt-10 flex">
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
