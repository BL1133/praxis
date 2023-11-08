import { TextInput } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { useProjectFormContext } from '@/providers/ProjectFormContext';

interface ProjectTitleProps {
  register: UseFormRegister<ProjectInputs>;
  errors: FieldErrors<ProjectInputs>;
}
export function ProjectTitle({ register, errors }: ProjectTitleProps) {
  const { loading, success } = useProjectFormContext();
  return (
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
          color={errors?.title && 'failure'}
          helperText={<>{errors?.title && errors?.title?.message}</>}
          id="title"
          disabled={loading || success ? true : false}
          placeholder="Type project title"
          {...register('title', {
            required: '*Project title required',
          })}
        />
      </div>
    </div>
  );
}
