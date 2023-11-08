import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { useProjectFormContext } from '@/providers/ProjectFormContext';

import { Tag } from '../../Tag';

interface TagProps {
  register: UseFormRegister<ProjectInputs>;
  fetchedTags: ProjectInputs['tags'];
  errors: FieldErrors<ProjectInputs>;
}

export function TagsSection({ register, fetchedTags, errors }: TagProps) {
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
      <div className="flex flex-wrap gap-1">
        {fetchedTags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            tagsRef={tagsRef}
            success={success}
            loading={loading}
            errors={errors}
          />
        ))}
        {errors?.tags && (
          <span className="text-orange-600 mt-1 text-sm">
            *You must choose at least 3 tags.
          </span>
        )}
      </div>
    </div>
  );
}
