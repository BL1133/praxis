import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Inputs } from 'types';

import { TagsSection } from '@/components/ProjectForm';
import { FileUpload } from '@/components/ProjectForm/FileUpload';
import { FullDescription } from '@/components/ProjectForm/FullDescription';
import { LinksSection } from '@/components/ProjectForm/LinksSection';
import { ProjectTitle } from '@/components/ProjectForm/ProjectTitle';
import { ShortDescription } from '@/components/ProjectForm/ShortDescription';
import { SkillsWanted } from '@/components/ProjectForm/SkillsWanted';
import { SubmitModal } from '@/components/SubmitModal';
import { useUser } from '@/lib/hooks/useUser';

import { LoadingProtected } from '../LoadingProtected';

interface ProjectFormWrapperProps {
  defaultValues: Inputs;
  onSubmit: (data: Inputs) => void;
  children: React.ReactNode;
}

export function ProjectFormWrapper({
  defaultValues, // Set the default value here
  onSubmit,
  children,
}: ProjectFormWrapperProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });

  const router = useRouter();
  const { data: userData, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <LoadingProtected>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
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
              <TagsSection defaultValues={defaultValues} register={register} />
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
      </section>
    </LoadingProtected>
  );
}
