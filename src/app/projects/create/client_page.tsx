'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { SubmitModal } from '@/components/SubmitModal';

import { createProject, uploadMedia } from '../../../utils/createHelpers';

interface CreateProjectProps {
  fetchedTags: ProjectInputs['tags'];
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  fetchedTags,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues = {
    title: '',
    fullDescription: '',
    shortDescription: '',
    skillsWanted: [],
    links: [],
    tags: [],
  };

  const handleCreateProject: SubmitHandler<ProjectInputs> = async (data) => {
    setIsModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      const MAX_FILES = 3;
      const mediaIds: string[] = [];
      if (data?.file?.length && data?.file?.length > MAX_FILES) {
        throw new Error(`You can only upload ${MAX_FILES} files.`);
      }
      // get response from uploadMedia
      if (data?.file?.length && data?.file?.length !== 0) {
        const { success, failures } = await uploadMedia(Array.from(data?.file));

        if (failures.length > 0) {
          failures.forEach((failure) => {
            setSubmitErrors((prev) => [...prev, failure.error.message]);
            console.error(
              `Failed to upload ${failure.fileName}: ${failure.error.message}`,
            );
          });
        } else {
          mediaIds.push(...success);
        }
      }
      // Remove empty links
      const filteredLinks = data?.links?.filter(
        (link) => link?.link?.trim() !== '',
      );
      const projectData = { ...data } as ProjectInputs;

      if (data.links && filteredLinks?.length) {
        projectData.links = filteredLinks;
      }
      if (mediaIds && mediaIds.length) {
        projectData.media = mediaIds;
      }
      // Get response from createProject
      const projectResponse = await createProject(projectData);
      const projectId = projectResponse?.doc?.id;
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/projects/${projectId}`);
      }, 3000);
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
          onSubmit={handleCreateProject}
          defaultValues={defaultValues}
          fetchedTags={fetchedTags}
        >
          <SubmitModal
            success={success}
            loading={loading}
            submitErrors={submitErrors}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            message="You have successfully created a project."
          />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Create a new Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
