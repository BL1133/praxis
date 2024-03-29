import { Accordion } from 'flowbite-react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { useTagsFilterContext } from '@/providers/TagsFilterContext';
import { tags } from '@/utils/tagsConfig';

import { FormTag } from '../FormTag';

interface TagsProps {
  tagsRef: UseFormRegisterReturn<'tags'>;
  errors: FieldErrors<ProjectInputs>;
  success: boolean | null;
  loading: boolean;
}

export function Tags({ tagsRef, errors }: TagsProps) {
  const { loading, success } = useTagsFilterContext();

  return (
    <Accordion alwaysOpen>
      {tags.map((tag) => (
        // loop over categories array
        // for each item, make heading of the category name
        // if subcategories, loop over subcategories array and make heading of subcategory name if it a string in the array
        // if subcategories, loop over subcategories array and make tags if it an array in the array
        // if tags, loop over tags array and make tags
        <Accordion.Panel key={tag.category}>
          <Accordion.Title className=" text-s font-medium tracking-wide">
            {tag.category}
          </Accordion.Title>
          <Accordion.Content className="bg-white">
            {/* If there are sub-categories for the category */}
            {tag.subCategories &&
              tag.subCategories.map((subcategory, index) => (
                <div key={`${tag.category}-${subcategory[0]}-${index}`}>
                  <h3 className="text-xs mb-2 ">- {subcategory[0]} -</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(subcategory[1] as string[]).map((subTag: string) => (
                      <FormTag
                        key={`${tag.category}-${subcategory[0]}-${subTag}`}
                        tag={subTag}
                        tagsRef={tagsRef}
                        success={success}
                        loading={loading}
                        errors={errors}
                      />
                    ))}
                  </div>
                </div>
              ))}
            {/* If No sub-categories */}
            <div className="flex flex-wrap gap-1 ">
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
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
}
