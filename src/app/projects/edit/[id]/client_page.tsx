'use client';
import { Project } from '@payloadTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { SubmitModal } from '@/components/SubmitModal';
import { useProject } from '@/lib/hooks/useProject';

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
    media,
  } = projectData;

  const defaultValues = {
    title,
    fullDescription,
    shortDescription,
    skillsWanted,
    links,
    tags,
  };

  const handleEditProject = async () => {
    setIsModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${data.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            fullDescription,
            shortDescription,
            skillsWanted,
            links,
            tags,
          }),
          credentials: 'include',
        },
      );

      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        await mutate();
        router.push(`/projects/${data.id}`);
      }

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.error || 'Failed to create project.');
      }
    } catch (error) {
      setSubmitErrors((prev) => [...prev, (error as Error).message]);
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
            message="You have successfully created a project."
          />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Your Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
