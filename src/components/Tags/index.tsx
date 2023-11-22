import { Accordion } from 'flowbite-react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { getTagLabel, tags } from '@/utils/tagsConfig';

import { FormTag } from '../FormTag';

interface TagsProps {
  tagsRef: UseFormRegisterReturn<'tags'>;
  success: boolean | null;
  loading: boolean;
  errors: FieldErrors<ProjectInputs>;
}

export function Tags({ tagsRef, success, loading, errors }: TagsProps) {
  return (
    <Accordion alwaysOpen>
      {tags.map((tag) => (
        // loop over categories array
        // for each item, make heading of the category name
        // if subcategories, loop over subcategories array and make heading of subcategory name if it a string in the array
        // if subcategories, loop over subcategories array and make tags if it an array in the array
        // if tags, loop over tags array and make tags
        <Accordion.Panel key={tag.category}>
          <Accordion.Title className="text-s font-medium tracking-wide">
            {tag.category}
          </Accordion.Title>
          <Accordion.Content>
            {/* If there are sub-categories for the category */}
            {tag.subCategories && (
              <>
                {tag.subCategories.map((subcategory) => (
                  <>
                    <h3 className="text-xs mb-2 ">- {subcategory[0]} -</h3>
                    <div
                      key={subcategory[0] as string}
                      className="flex flex-wrap gap-1 mb-2"
                    >
                      {(subcategory[1] as string[]).map((tag: string) => (
                        <FormTag
                          key={tag}
                          tag={getTagLabel(tag)}
                          tagsRef={tagsRef}
                          success={success}
                          loading={loading}
                          errors={errors}
                        />
                      ))}
                    </div>
                  </>
                ))}
              </>
            )}
            {/* If No sub-categories */}
            <div className="flex flex-wrap gap-1 ">
              {tag.tags?.map((tag: string) => (
                <FormTag
                  key={tag}
                  tag={getTagLabel(tag)}
                  tagsRef={tagsRef}
                  success={success}
                  loading={loading}
                  errors={errors}
                />
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
}
