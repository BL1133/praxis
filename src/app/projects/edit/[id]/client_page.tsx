'use client';
import { Project } from '@payloadTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { SubmitModal } from '@/components/SubmitModal';
import { useProject } from '@/lib/hooks/useProject';
import { editProject } from '@/utils/createHelpers';

interface ProjectProps {
  projectData: Project;
  fetchedTags: ProjectInputs['tags'];
}

export const EditProject: React.FC<ProjectProps> = ({
  projectData,
  fetchedTags,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, mutate } = useProject(projectData);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    title,
    shortDescription,
    fullDescription,
    skillsWanted,
    links,
    tags,
    id,
    media,
  } = data;

  const defaultValues = {
    title,
    fullDescription,
    shortDescription,
    skillsWanted,
    links,
    tags,
  };

  const handleEditProject: SubmitHandler<ProjectInputs> = async (inputs) => {
    setIsModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      await editProject(inputs, id);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/projects/${id}`);
      }, 3000);
      await mutate();
    } catch (error) {
      console.error('Operation failed', (error as Error).message);
      setSubmitErrors((prev) => [...prev, (error as Error).message]);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <LoadingProtected>
      <section className="bg-white dark:bg-gray-900">
        <ProjectFormWrapper
          loading={loading}
          success={success}
          onSubmit={handleEditProject}
          defaultValues={defaultValues}
          fetchedTags={fetchedTags}
          editing
        >
          <SubmitModal
            success={success}
            loading={loading}
            submitErrors={submitErrors}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            message="You have successfully edited your project."
          />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Your Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
