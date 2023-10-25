import { Badge } from 'flowbite-react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './index.module.css';

export function Tag({
  tag,
  tagsRef,
  success,
  loading,
}: {
  tag: string;
  tagsRef: UseFormRegisterReturn<'tags'>;
  success: boolean | null;
  loading: boolean;
}) {
  return (
    <label key={tag} className="badge-checkbox">
      <input
        type="checkbox"
        value={tag}
        className={`hidden ${styles.checkboxHidden} ${
          (loading || success) && styles.disabledCheckbox
        }`}
        disabled={loading || success ? true : false}
        {...tagsRef}
      />
      <Badge
        color="gray"
        className={`mt-1checked:bg-cyan-600 hover:text-cyan-600 checked:text-gray-100 hover:cursor-pointer`}
      >
        {tag}
      </Badge>
    </label>
  );
}
