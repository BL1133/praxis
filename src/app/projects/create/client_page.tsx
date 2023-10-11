'use client';
// Ensure this import is correct
// Used for navigation
import { Textarea, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs, ProjectResponse } from 'types';

import { FileUpload } from '@/components/FileUpload';
import { FormInputError } from '@/components/FormInputError';
import { SubmitModal } from '@/components/SubmitModal';
import { useUser } from '@/lib/hooks/useUser';

type FailedUploadType = { fileName: string; error: Error };

export const CreateProject: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      brand: '',
      price: 0,
      category: '',
      itemWeight: 0,
      description: '',
    },
  });
  const router = useRouter();
  const { data: userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleCreateProject: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data); //TODO: Remove this

    async function uploadMedia(
      files: File[],
    ): Promise<(string | FailedUploadType)[]> {
      const uploadPromises = files.map(async (file) => {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_URL}/api/media`,
            {
              method: 'POST',
              body: formData,
              credentials: 'include',
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to upload file: ${file.name}`);
          }

          const uploadResult = await response.json();
          return uploadResult.doc.id;
        } catch (error) {
          console.error('Error uploading file: ${file.name}', error);
          return { fileName: file.name, error };
        }
      });

      const uploadResponse = await Promise.all(uploadPromises);
      return uploadResponse;
    }

    async function createProject(
      projectData: Omit<Inputs, 'file'>,
    ): Promise<ProjectResponse> {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
          credentials: 'include',
        },
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to create project.');
      }
      return resData;
    }

    async function mainFlow(data: Inputs) {
      try {
        // Upload media if it exists
        const MAX_FILES = 3;
        const mediaIds: string[] = [];
        if (data.file.length > MAX_FILES) {
          throw new Error(`You can only upload ${MAX_FILES} files.`);
        }
        if (data.file.length !== 0) {
          const uploadResponse = await uploadMedia(Array.from(data.file));
          const failedUploads: FailedUploadType[] = uploadResponse.filter(
            (upload: string | FailedUploadType) =>
              typeof upload === 'object' && 'error' in upload,
          ) as FailedUploadType[];
          if (failedUploads.length > 0) {
            failedUploads.forEach((failure) => {
              console.error(
                `Failed to upload ${failure.fileName}: ${failure.error.message}`,
              );
            });
            // Any other error handling or user feedback logic you might have.
          }
        }
        const projectData = {
          ...data,
          media: mediaIds,
        };
        const projectResponse = await createProject(projectData);
        console.log(projectResponse);
        const projectId = projectResponse.doc.id;
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          router.push(`/projects/${projectId}`);
        }, 3000);
      } catch (error) {
        console.error('Operation failed', (error as Error).message);
        setLoading(false);
        setSuccess(false);
      }
    }
    mainFlow(data);
  };

  const myStyle = {
    color: 'black',
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        {/* Submitting Modal */}
        <SubmitModal
          success={success}
          loading={loading}
          errors={errors}
          message="You have successfully created a project."
          redirect={`/`}
        />

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create a new Project
        </h2>
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project Title
              </label>
              <div className="w-full">
                <TextInput
                  type="text"
                  id="title"
                  disabled={loading || success ? true : false}
                  placeholder="Type project title"
                  {...register('title', { required: 'Project title required' })}
                />
                {errors.title && (
                  <FormInputError message={errors?.title?.message ?? null} />
                )}
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                disabled={loading || success ? true : false}
                className={`custom-input ${
                  loading || success
                    ? 'placeholder-gray-200 dark:placeholder-gray-600  text-gray-200 dark:text-gray-600 cursor-not-allowed'
                    : ''
                }`}
                placeholder="Product brand"
                {...register('brand')}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                disabled={loading || success ? true : false}
                className={`custom-input ${
                  loading || success
                    ? 'placeholder-gray-200 dark:placeholder-gray-600 text-gray-200 dark:text-gray-600 cursor-not-allowed'
                    : ''
                }`}
                placeholder="$2999"
                {...register('price')}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                disabled={loading || success ? true : false}
                {...register('category')}
                className={`custom-input ${
                  loading || success
                    ? 'placeholder-gray-200 dark:placeholder-gray-600 text-gray-200 dark:text-gray-600 cursor-not-allowed'
                    : ''
                }`}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Weight (kg)
              </label>
              <input
                type="number"
                id="item-weight"
                disabled={loading || success ? true : false}
                className={`custom-input ${
                  loading || success
                    ? 'placeholder-gray-200 dark:placeholder-gray-600 text-gray-200 dark:text-gray-600 cursor-not-allowed'
                    : ''
                }`}
                placeholder="12"
                {...register('itemWeight')}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <Textarea
                id="description"
                rows={8}
                disabled={loading || success ? true : false}
                placeholder="Your description here"
                {...register('description', {
                  required: 'Description is required',
                })}
              ></Textarea>
              {errors.description && (
                <FormInputError
                  message={errors?.description?.message ?? null}
                />
              )}
            </div>
            <FileUpload fileRef={register('file')} />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};
