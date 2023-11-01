import { Media } from '@payloadTypes';
import { useForm } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { FilesAccordion } from '@/components/FilesAccordion';
import { FileUpload } from '@/components/ProjectForm/FileUpload';
import { FullDescription } from '@/components/ProjectForm/FullDescription';
import { LinksSection } from '@/components/ProjectForm/LinksSection';
import { ProjectTitle } from '@/components/ProjectForm/ProjectTitle';
import { ShortDescription } from '@/components/ProjectForm/ShortDescription';
import { SkillsWanted } from '@/components/ProjectForm/SkillsWanted';
import { TagsSection } from '@/components/ProjectForm/TagsSection';

interface ProjectFormWrapperProps {
  defaultValues: ProjectInputs;
  onSubmit: (data: ProjectInputs) => void;
  children: React.ReactNode;
  loading: boolean;
  success: boolean | null;
  fetchedTags: ProjectInputs['tags'];
  editing?: boolean;
  media?: Media[];
  promptDeleteConfirm?: () => void;
}

export function ProjectFormWrapper({
  defaultValues,
  onSubmit,
  children,
  loading,
  success,
  fetchedTags,
  editing = false, // default to false unless passed in as true
  media,
  promptDeleteConfirm,
}: ProjectFormWrapperProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInputs>({
    defaultValues,
  });

  return (
    <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
      {/* Submit modal and title comes from the page */}
      {children}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 place-content-center">
          <ProjectTitle
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <ShortDescription
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <FullDescription
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <SkillsWanted
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <TagsSection
            fetchedTags={fetchedTags}
            errors={errors}
            register={register}
            success={success}
            loading={loading}
          />
          <div>
            <FileUpload
              fileRef={register('file')}
              success={success}
              loading={loading}
            />
            {editing && media && (
              <div className="mt-5">
                <FilesAccordion media={media} editing />
              </div>
            )}
          </div>
          <LinksSection
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={loading || success ? true : false}
            className={`inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ${
              (loading || success) &&
              'disabled:cursor-not-allowed disabled:opacity-50'
            }`}
          >
            {editing ? 'Save' : 'Create Project'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={promptDeleteConfirm}
              className={`inline-flex items-center ml-4 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-orange-800 hover:bg-red-800 ${
                (loading || success) &&
                'disabled:cursor-not-allowed disabled:opacity-50'
              }`}
            >
              Delete Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
