import { Textarea } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Inputs } from 'types';

interface FullDescriptionProps {
  register: UseFormRegister<Inputs>;
  loading: boolean;
  success: boolean | null;
  errors: FieldErrors<Inputs>;
  defaultValues: Inputs;
}
export function FullDescription({
  register,
  loading,
  success,
  defaultValues,
}: FullDescriptionProps) {
  return (
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
  );
}
