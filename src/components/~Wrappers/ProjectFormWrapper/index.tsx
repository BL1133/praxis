import { useForm } from 'react-hook-form';
import { Inputs } from 'types';

import { TagsSection } from '@/components/ProjectForm';
import { FileUpload } from '@/components/ProjectForm/FileUpload';
import { FullDescription } from '@/components/ProjectForm/FullDescription';
import { LinksSection } from '@/components/ProjectForm/LinksSection';
import { ProjectTitle } from '@/components/ProjectForm/ProjectTitle';
import { ShortDescription } from '@/components/ProjectForm/ShortDescription';
import { SkillsWanted } from '@/components/ProjectForm/SkillsWanted';

interface ProjectFormWrapperProps {
  defaultValues: Inputs;
  onSubmit: (data: Inputs) => void;
  children: React.ReactNode;
  loading: boolean;
  success: boolean | null;
  fetchedTags: Inputs['tags'];
}

export function ProjectFormWrapper({
  defaultValues,
  onSubmit,
  children,
  loading,
  success,
  fetchedTags,
}: ProjectFormWrapperProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      {/* Submit modal and title comes from the page */}
      {children}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ProjectTitle
            defaultValues={defaultValues}
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <ShortDescription
            defaultValues={defaultValues}
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <FullDescription
            defaultValues={defaultValues}
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
          <SkillsWanted
            defaultValues={defaultValues}
            register={register}
            errors={errors}
          />
          <TagsSection fetchedTags={fetchedTags} register={register} />
          <FileUpload fileRef={register('file')} />
          <LinksSection
            defaultValues={defaultValues}
            register={register}
            errors={errors}
            success={success}
            loading={loading}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
