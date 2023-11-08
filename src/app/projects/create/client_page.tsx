'use client';
/**
 * This file contains the CreateProject component, which is used to render the page where users can create a new project.
 * It uses the ProjectFormWrapper component to render the form and the SubmitModal component to display the result of the submission.
 * Handling media upload is done with file from data inputs.
 * The file is then passed to uploadMedia, which returns a response
 * This response adds to mediaIds, an array of media ids as strings.
 * Which is then passed with the rest of the data to createProject.
 *
 * @file defines the CreateProject component
 * @since 1.0.0
 */

import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { LoadingProtected } from '@/components/~Wrappers/LoadingProtected';
import { ProjectFormWrapper } from '@/components/~Wrappers/ProjectFormWrapper';
import { SubmitModal } from '@/components/SubmitModal';
import { useProjectFormContext } from '@/providers/ProjectFormContext';

import {
  createProject,
  uploadMediaAndGetSubmitData,
} from '../../../utils/projectHelpers';

interface CreateProjectProps {
  fetchedTags: ProjectInputs['tags'];
}

/**
 * CreateProject is the page where users can create a new project.
 * It uses the ProjectFormWrapper component to render the form.
 * It also uses the SubmitModal component to render a modal that
 * displays the result of the submission.
 *
 * @param {CreateProjectProps} props - The props that are passed to the component
 * @returns {JSX.Element} - The CreateProject component
 */
export const CreateProject: React.FC<CreateProjectProps> = ({
  fetchedTags,
}) => {
  const router = useRouter();
  const context = useProjectFormContext();
  const { setLoading, setSuccess, setSubmitErrors, setIsSubmitModalOpen } =
    context;

  const defaultValues = {
    title: '',
    fullDescription: '',
    shortDescription: '',
    skillsWanted: [],
    tags: [],
  };

  /**
   * Handles the submission of the project form.
   * If there are any errors, it sets the submitErrors state.
   * If the submission is successful, it sets the success state to true and redirects to the project page.
   *
   * @param {ProjectInputs} data - The data from the project form
   * @returns {Promise<void>} - A promise that resolves when the submission is complete
   */
  const handleCreateProject: SubmitHandler<ProjectInputs> = async (data) => {
    console.log(data);
    setIsSubmitModalOpen(true);
    setLoading(true);
    setSubmitErrors([]);
    try {
      const projectData = await uploadMediaAndGetSubmitData(
        data,
        setSubmitErrors,
      );
      // Get response from createProject
      const projectResponse = await createProject(projectData);
      const projectId = projectResponse?.doc?.id;
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/projects/${projectId}`);
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

  return (
    <LoadingProtected>
      <section className="bg-white dark:bg-gray-900">
        <ProjectFormWrapper
          onSubmit={handleCreateProject}
          defaultValues={defaultValues}
          fetchedTags={fetchedTags}
        >
          <SubmitModal message="You have successfully created a project." />
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Create a new Project
          </h2>
        </ProjectFormWrapper>
      </section>
    </LoadingProtected>
  );
};
