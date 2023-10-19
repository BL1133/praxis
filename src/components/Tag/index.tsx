import { Badge } from 'flowbite-react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './index.module.css';

export function Tag({
  tag,
  tagsRef,
}: {
  tag: string;
  tagsRef: UseFormRegisterReturn<'tags'>;
}) {
  return (
    <label key={tag} className="badge-checkbox">
      <input
        type="checkbox"
        value={tag}
        className={`hidden ${styles.checkboxHidden}`}
        {...tagsRef}
      />
      <Badge
        color="gray"
        className="mt-1 hover:bg-cyan-600 checked:bg-cyan-600 hover:text-gray-100 checked:text-gray-100 hover:cursor-pointer"
      >
        {tag}
      </Badge>
    </label>
  );
}
