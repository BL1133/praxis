'use client';

import { Project } from '@payloadTypes';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { GetProjectsResponse } from 'types';

import { ProjectSkillsWanted } from '@/components/ProjectSkillsWanted';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectTitleAndDescription } from '@/components/ProjectTitleAndDescription';
import { Tags } from '@/components/Tags';
import { useProjects } from '@/lib/hooks/useProjects';
import { useTagsFilterContext } from '@/providers/TagsFilterContext';

type TagsFormInputs = {
  tags: string[]; // Assuming tags are an array of strings
};

export const Projects: React.FC<{ projects: GetProjectsResponse }> = ({
  projects,
}) => {
  const { data, isError, isLoading } = useProjects(projects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    loading,
    setLoading,
    success,
    setSuccess,
    submitErrors,
    setSubmitErrors,
  } = useTagsFilterContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagsFormInputs>();

  const tagsRef = register('tags');

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <div>Loading projects...</div>;

  function handleFiltering() {
    setLoading(true);
    setSuccess(null);
    setSubmitErrors([]);
  }

  function clearAllFilters() {
    setLoading(false);
    setSuccess(null);
    setSubmitErrors([]);
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row  relative">
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
