'use client';
// Ensure this import is correct
// Used for navigation
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs, ProjectResponse } from 'types';

import { FileUpload } from '@/components/FileUpload';
import { FormInputError } from '@/components/FormInputError';
import { SubmitModal } from '@/components/SubmitModal';
import { useUser } from '@/lib/hooks/useUser';

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
  const { data: userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userData?.user) {
      redirect('/login');
    }
  }, [userData]);

  let projectUrl;

  const handleCreateProject: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data); //TODO: Remove this

    async function uploadMedia(file: File): Promise<string> {
      const formData = new FormData();
      formData.append('file', file);
      const fileUploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/media`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      if (!fileUploadResponse.ok) {
        throw new Error('Failed to upload file.');
      }

      const fileUploadResult = await fileUploadResponse.json();
      return fileUploadResult.doc;
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
      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.error || 'Failed to create project.');
      }
      const resData = await res.json();
      return resData;
    }

    async function mainFlow(data: Inputs) {
      try {
        await uploadMedia(data.file[0]);
        const projectData = {
          ...data,
        };
        await createProject(projectData);
        setLoading(false);
        setSuccess(true);
        // setTimeout(() => {
        //   redirect('/');
        // }, 5000); // Redirects after 3 seconds
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
                <input
                  type="text"
                  id="title"
                  disabled={loading || success ? true : false}
                  className={`custom-input
                    ${
                      loading || success
                        ? 'placeholder-gray-200 dark:placeholder-gray-600 text-gray-200 dark:text-gray-600 cursor-not-allowed'
                        : ''
                    }
                    `}
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
              <textarea
                id="description"
                rows={8}
                disabled={loading || success ? true : false}
                className={`custom-input ${
                  loading || success
                    ? 'placeholder-gray-200 dark:placeholder-gray-600 text-gray-200 dark:text-gray-600 cursor-not-allowed'
                    : ''
                }`}
                placeholder="Your description here"
                {...register('description', {
                  required: 'Description is required',
                })}
              ></textarea>
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
