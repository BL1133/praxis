'use client';
import { Project } from '@payloadTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import { SubmitModal } from '@/components/SubmitModal';
import { useProject } from '@/lib/hooks/useProject';
import {
  deleteProject,
  editProject,
  uploadMediaAndGetSubmitData,
} from '@/utils/projectHelpers';

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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // for submiModal message
  const {
    title,
    shortDescription,
    fullDescription,
    skillsWanted,
    links,
    tags,
    id,
    media,
  } = data || {}; // prevents runtime error if project is undefined

  const defaultValues = {
    title,
    fullDescription,
    shortDescription,
    skillsWanted,
    links,
    tags,
    media,
  };

  const handleEditProject: SubmitHandler<ProjectInputs> = async (inputs) => {
    setIsSubmitModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      const submitData = await uploadMediaAndGetSubmitData(
        inputs,
        setSubmitErrors,
        id,
      );
      console.log(submitData);
      await editProject(submitData, id);
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

  const promptDeleteConfirm = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDeleteProject = async () => {
    setIsConfirmModalOpen(false);
    setIsSubmitModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      await deleteProject(id);
      setLoading(false);
      setIsDeleted(true); // for submit modal message
      setSuccess(true);
      setTimeout(() => {
        router.push(`/projects/`);
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
          onSubmit={handleEditProject}
          defaultValues={defaultValues}
          fetchedTags={fetchedTags}
          promptDeleteConfirm={promptDeleteConfirm}
          editing
        >
          <SubmitModal
            success={success}
            loading={loading}
            submitErrors={submitErrors}
            isSubmitModalOpen={isSubmitModalOpen}
            setIsSubmitModalOpen={setIsSubmitModalOpen}
            message={isDeleted ? 'Project deleted.' : 'Project updated!'}
          />
          <ConfirmDelete
            isConfirmModalOpen={isConfirmModalOpen}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            handleDelete={handleDeleteProject}
          />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Your Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
