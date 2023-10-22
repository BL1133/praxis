'use client';

import { Checkbox, Label, Textarea, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from 'types';

import BadStatusPage from '@/components/BadStatusPage';
import { Loading } from '@/components/LoadingPage';
import { FileUpload } from '@/components/ProjectForm/FileUpload';
import { SubmitModal } from '@/components/SubmitModal';
import { Tag } from '@/components/Tag';
import { useUser } from '@/lib/hooks/useUser';

import { createProject, uploadMedia } from '../../../utils/createHelpers';

interface CreateProjectProps {
  tags: Inputs['tags'];
}

export const CreateProject: React.FC<CreateProjectProps> = ({ tags }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      fullDescription: '',
      shortDescription: '',
      skillsWanted: [],
      links: [],
      tags: [],
    },
  });
  const router = useRouter();
  const { data: userData, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject: SubmitHandler<Inputs> = async (data) => {
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
        (link) => link.link.trim() !== '',
      );
      const projectData = { ...data } as Inputs & { media?: string[] };

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
  // Register the skillsWanted group with validation
  // This is so that validate isn't run on every checkbox
  // Because checboxes all have same name, they are grouped
  // So validate runs once on entire group, which is an array
  const skillsWantedRef = register('skillsWanted', {
    validate: (value) => value.length > 0 || '*At least one skill is required',
  });

  const tagsRef = register('tags', {
    validate: (value) =>
      value.length >= 3 || 'At least three tags are required',
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : !userData?.user ? (
        <BadStatusPage statusCode={403} />
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            {/* Submitting Modal */}
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
            <form onSubmit={handleSubmit(handleCreateProject)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Project Title ---------------------------------------*/}
                <div className="sm:col-span-2">
                  <div className="flex">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Project Title
                    </label>
                  </div>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      color={errors.title && 'failure'}
                      helperText={<>{errors.title && errors?.title?.message}</>}
                      id="title"
                      disabled={loading || success ? true : false}
                      placeholder="Type project title"
                      {...register('title', {
                        required: 'Project title required',
                      })}
                    />
                  </div>
                </div>
                {/* end of Project Title ---------------------------------------*/}
                {/* Short Description ---------------------------------------*/}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Short Description
                  </label>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      color={errors?.shortDescription && 'failure'}
                      helperText={
                        errors?.shortDescription &&
                        errors?.shortDescription?.message
                      }
                      id="title"
                      disabled={loading || success ? true : false}
                      placeholder="Describe your project in a few sentences"
                      {...register('shortDescription', {
                        required: 'Short Description required',
                      })}
                    />
                  </div>
                </div>
                {/* end of Short Description ---------------------------------------*/}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullDescription"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Project Description
                  </label>
                  <Textarea
                    id="fullDescription"
                    rows={8}
                    disabled={loading || success ? true : false}
                    placeholder="This is where you can fully describe all details of your project."
                    {...register('fullDescription', {
                      required: 'Description is required',
                    })}
                  ></Textarea>
                </div>
                {/* start of Skills Wanted ----------------------------- */}
                <div className="flex max-w-md flex-col gap-4" id="skills">
                  <div className="flex gap-2">
                    <label
                      htmlFor="skills"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Skills Wanted:
                    </label>
                    <span className="text-xs pt-1 text-gray-500">
                      (Choose at least 1)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="developer"
                      className="hover:cursor-pointer"
                      value="developer"
                      {...skillsWantedRef}
                    />
                    <Label className="flex" htmlFor="developer">
                      Developer
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="designer"
                      className="hover:cursor-pointer"
                      value="designer"
                      {...skillsWantedRef}
                    />
                    <Label htmlFor="designer">Designer</Label>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-5 items-center">
                      <Checkbox
                        id="mentor"
                        className="hover:cursor-pointer"
                        value="mentor"
                        {...skillsWantedRef}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="mentor">Mentor</Label>
                      <div className="text-gray-500 dark:text-gray-300">
                        <span className="text-xs font-normal">
                          <p>
                            Find a mentor to help guide you with your project.
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-5 items-center">
                      <Checkbox
                        id="maintainer"
                        className="hover:cursor-pointer"
                        value="maintainer"
                        {...skillsWantedRef}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="maintainer">Maintainer</Label>
                      <div className="text-gray-500 dark:text-gray-300">
                        <span className="text-xs font-normal">
                          <p>
                            Maintainers have the ability to manage the project.
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                  {errors?.skillsWanted && (
                    <span className="text-orange-600 mt-1 text-sm">
                      {errors?.skillsWanted?.message}
                    </span>
                  )}
                </div>
                {/* end of Skills Wanted ----------------------------- */}
                {/* Start of tags ------------------ */}
                <div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="skills"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Tags:
                    </label>
                    <span className="text-xs pt-1 text-gray-500">
                      (Choose at least 3)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <Tag key={tag} tag={tag} tagsRef={tagsRef} />
                    ))}
                  </div>
                </div>
                {/* end of tags -------------------- */}
                <FileUpload fileRef={register('file')} />
                {/* start of Links */}
                <div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="links"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Links
                    </label>
                    <span className="text-xs pt-1 text-gray-500">
                      (optional)
                    </span>
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <div>
                      <TextInput
                        type="text"
                        sizing="sm"
                        helperText={
                          <>
                            {errors?.links?.[0]?.link &&
                              errors?.links?.[0]?.link?.message}
                          </>
                        }
                        color={errors?.links && 'failure'}
                        id="link1"
                        disabled={loading || success ? true : false}
                        placeholder="Add a link starting with 'http...'"
                        {...register('links[0].link' as keyof Inputs, {
                          // eslint-disable-next-line
                          validate: (value: any) => {
                            if (!value) return true;
                            return (
                              /^(http|https):\/\/[^ "]+$/.test(value) ||
                              "Invalid URL. It must start with 'http' or 'https'."
                            );
                          },
                        })}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="text"
                        sizing="sm"
                        helperText={
                          <>
                            {errors?.links?.[1]?.link &&
                              errors?.links?.[1]?.link.message}
                          </>
                        }
                        color={errors?.links && 'failure'}
                        id="link2"
                        disabled={loading || success ? true : false}
                        placeholder="Add a link starting with 'http...'"
                        {...register('links[1].link' as keyof Inputs, {
                          // eslint-disable-next-line
                          validate: (value: any) => {
                            if (!value) return true;
                            return (
                              /^(http|https):\/\/[^ "]+$/.test(value) ||
                              "Invalid URL. It must start with 'http' or 'https'."
                            );
                          },
                        })}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="text"
                        sizing="sm"
                        helperText={
                          <>
                            {errors?.links?.[2]?.link &&
                              errors?.links?.[2]?.link.message}
                          </>
                        }
                        color={errors?.links && 'failure'}
                        id="link3"
                        disabled={loading || success ? true : false}
                        placeholder="Add a link starting with 'http...'"
                        {...register('links[2].link' as keyof Inputs, {
                          // eslint-disable-next-line
                          validate: (value: any) => {
                            if (!value) return true;
                            return (
                              /^(http|https):\/\/[^ "]+$/.test(value) ||
                              "Invalid URL. It must start with 'http' or 'https'."
                            );
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
                {/* end of Links */}
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
      )}
    </div>
  );
};
