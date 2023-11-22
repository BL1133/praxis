import { Project } from '@payloadTypes';

import { Tag } from '../Tag';

export function ProjectTags({ projectData }: { projectData: Project }) {
  console.log(projectData);
  return (
    <div>
      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
        Tags
      </dt>
      <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
        {projectData?.tags?.map((tag) => (
          <a key={tag} href={`/`}>
            <Tag tag={tag} />
          </a>
        ))}
      </dd>
    </div>
  );
}
