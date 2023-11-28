import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { getTagLabel } from '@/utils/tagsConfig';

import { Tag } from '../Tag';
import styles from './index.module.css';

export function FormTag({
  tag,
  tagsRef,
  success,
  loading,
}: {
  tag: string;
  tagsRef: UseFormRegisterReturn<'tags'>;
  success: boolean | null;
  loading: boolean;
  errors: FieldErrors<ProjectInputs>;
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
      <Tag tag={getTagLabel(tag)} />
    </label>
  );
}
