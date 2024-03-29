'use client';
import { Media, Project } from '@payloadTypes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { BadStatusPage } from '@/components/BadStatusPage';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import { Loading } from '@/components/LoadingPage';
import { SubmitModal } from '@/components/SubmitModal';
import { useProject } from '@/lib/hooks/useProject';
import { useUser } from '@/lib/hooks/useUser';
import { useProjectFormContext } from '@/providers/ProjectFormContext';
import { IsOwnProject } from '@/utils/isOwnProject';
import {
  deleteProject,
  editProject,
  removeFileFromMediaCollection,
  uploadMediaAndGetSubmitData,
} from '@/utils/projectHelpers';

interface ProjectProps {
  projectData: Project;
}

export const EditProject: React.FC<ProjectProps> = ({ projectData }) => {
  const context = useProjectFormContext();
  const {
    setLoading,
    setSuccess,
    setSubmitErrors,
    setIsSubmitModalOpen,
    setIsConfirmModalOpen,
    isDeleted,
    setIsDeleted,
    filterStagedForRemoval,
    stagedForRemoval,
    resetStagedForRemoval,
  } = context;
  //
  const router = useRouter();
  const { data: fetchedProjectData, mutate } = useProject(projectData);
  const { data: userData } = useUser();
  const {
    title,
    shortDescription,
    fullDescription,
    skillsWanted,
    links,
    tags,
    id,
    media,
  } = fetchedProjectData || {}; // prevents runtime error if project is undefined

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
    // Update media inputs if any files were staged for removal
    if (stagedForRemoval.length > 0) {
      inputs.media = filterStagedForRemoval(inputs.media as Media[]);
    }
    setIsSubmitModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      removeFileFromMediaCollection(stagedForRemoval);
      const submitData = await uploadMediaAndGetSubmitData(
        inputs, // includes removed media
        setSubmitErrors,
        id,
      );
      await editProject(submitData, id);
      setLoading(false);
      setSuccess(true);
      resetStagedForRemoval();
      setTimeout(() => {
        router.push(`/projects/${id}`);
        setIsSubmitModalOpen(false);
        setSuccess(false);
      }, 3000);
      await mutate();
    } catch (error) {
      console.error('Operation failed', (error as Error).message);
      setSubmitErrors((prev) => [...prev, (error as Error).message]);
      setLoading(false);
      setSuccess(false);
    }
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
      await mutate(null);
      setTimeout(() => {
        router.push(`/projects/`);
        setIsSubmitModalOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Operation failed', (error as Error).message);
      setSubmitErrors((prev) => [...prev, (error as Error).message]);
      setLoading(false);
      setSuccess(false);
    }
  };

  if (!userData || !fetchedProjectData) return <Loading />;

  if (!IsOwnProject(userData, fetchedProjectData))
    return <BadStatusPage statusCode={403} />;

  return (
    <LoadingProtected>
      <section className="bg-white dark:bg-gray-900">
        <ProjectFormWrapper
          onSubmit={handleEditProject}
          defaultValues={defaultValues}
          editing
        >
          <SubmitModal
            message={isDeleted ? 'Project deleted.' : 'Project updated!'}
          />
          <ConfirmDelete handleDelete={handleDeleteProject} />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Your Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
