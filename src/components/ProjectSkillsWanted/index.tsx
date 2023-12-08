import { Project } from '@payloadTypes';

import { Tag } from '../Tag';

export function ProjectSkillsWanted({ projectData }: { projectData: Project }) {
  return (
    <div>
      <dt className="font-semibold leading-none text-gray-900 dark:text-white mb-2.5">
        Skills Wanted
      </dt>
      <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
        {projectData?.skillsWanted?.map((skill) => (
          <div key={skill}>
            <Tag
              tag={skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase()}
              noClick={true}
            />
          </div>
        ))}
      </dd>
    </div>
  );
}
