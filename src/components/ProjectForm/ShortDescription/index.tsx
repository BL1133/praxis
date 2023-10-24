import { TextInput } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

interface ShortDescriptionProps {
  register: UseFormRegister<ProjectInputs>;
  loading: boolean;
  success: boolean | null;
  errors: FieldErrors<ProjectInputs>;
}

export function ShortDescription({
  register,
  errors,
  loading,
  success,
}: ShortDescriptionProps) {
  return (
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
            errors?.shortDescription && errors?.shortDescription?.message
          }
          id="title"
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
