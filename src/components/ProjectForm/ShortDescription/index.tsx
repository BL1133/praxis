import { TextInput } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { useProjectFormContext } from '@/providers/ProjectFormContext';

interface ShortDescriptionProps {
  register: UseFormRegister<ProjectInputs>;
  errors: FieldErrors<ProjectInputs>;
}

export function ShortDescription({ register, errors }: ShortDescriptionProps) {
  const { loading, success } = useProjectFormContext();
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="shortDescription"
        className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
      >
        Short Description
      </label>
      <div className="w-full">
        <TextInput
          type="text"
          color={errors?.shortDescription && 'failure'}
          helperText={
            errors?.shortDescription && errors?.shortDescription?.message
          }
          id="shortDescription"
          disabled={loading || success ? true : false}
          placeholder="Describe your project in a few sentences"
          {...register('shortDescription', {
            required: '*Short Description required',
          })}
        />
      </div>
    </div>
  );
}
