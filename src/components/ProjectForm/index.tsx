import { UseFormRegister } from 'react-hook-form';
import { Inputs } from 'types';

import { Tag } from '../Tag';

interface TagProps {
  register: UseFormRegister<Inputs>;
  defaultValues: Inputs;
}

export function TagsSection({ register, defaultValues }: TagProps) {
  const tagsRef = register('tags', {
    validate: (value) =>
      value.length >= 3 || 'At least three tags are required',
  });
  const { tags } = defaultValues;
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
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} tagsRef={tagsRef} />
        ))}
      </div>
    </div>
  );
}
