import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { tags } from '@/utils/tagsConfig';

import { FormTag } from '../FormTag';

interface TagsProps {
  tagsRef: UseFormRegisterReturn<'tags'>;
  success: boolean | null;
  loading: boolean;
  errors: FieldErrors<ProjectInputs>;
}

export function Tags({ tagsRef, success, loading, errors }: TagsProps) {
  return (
    <div>
      {tags.map((tag) => (
        // loop over categories array
        // for each item, make heading of the category name
        // if subcategories, loop over subcategories array and make heading of subcategory name if it a string in the array
        // if subcategories, loop over subcategories array and make tags if it an array in the array
        // if tags, loop over tags array and make tags
        <div key={tag.category}>
          <h2>{tag.category}</h2>
          {/* If there are sub-categories for the category */}
          {tag.subCategories && (
            <div>
              {tag.subCategories.map((subcategory) => (
                <div
                  key={subcategory[0] as string}
                  className="flex flex-wrap gap-1"
                >
                  <h3>{subcategory[0]}</h3>
                  {(subcategory[1] as string[]).map((tag: string) => (
                    <FormTag
                      key={tag}
                      tag={tag}
                      tagsRef={tagsRef}
                      success={success}
                      loading={loading}
                      errors={errors}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* If No sub-categories */}
          <div className="flex flex-wrap gap-1">
            {tag.tags?.map((tag: string) => (
              <FormTag
                key={tag}
                tag={tag}
                tagsRef={tagsRef}
                success={success}
                loading={loading}
                errors={errors}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
