import { Project } from '@payloadTypes';

import { getTagLabel } from '@/utils/tagsConfig';

import { Tag } from '../Tag';

export function ProjectTags({ projectData }: { projectData: Project }) {
  return (
    <div>
      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
        Tags
      </dt>
      <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
        {projectData?.tags?.map((tag) => (
          <div key={tag}>
            <Tag tag={getTagLabel(tag)} noClick={true} />
          </div>
        ))}
      </dd>
    </div>
  );
}
