import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { Tags } from '@/components/Tags';
import { useProjectFormContext } from '@/providers/ProjectFormContext';

interface TagProps {
  register: UseFormRegister<ProjectInputs>;
  errors: FieldErrors<ProjectInputs>;
}

export function TagsSection({ register, errors }: TagProps) {
  const { loading, success } = useProjectFormContext();
  const tagsRef = register('tags', {
    validate: (value) =>
      value.length >= 3 || 'At least three tags are required',
  });

  return (
    <div>
      <div className="flex gap-2">
        <label
          htmlFor="skills"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Tags:
        </label>
        <span className="text-xs pt-1 text-gray-500">(Choose at least 3)</span>
      </div>
      <Tags
        tagsRef={tagsRef}
        success={success}
        loading={loading}
        errors={errors}
      />
      {errors?.tags && (
        <span className="text-orange-600 mt-2 text-sm">
          *You must choose at least 3 tags.
        </span>
      )}
    </div>
  );
}
