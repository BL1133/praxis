import { Media, Project, User } from '@payloadTypes';
import { Avatar } from 'flowbite-react';
import moment from 'moment';
import Link from 'next/link';

import { FilesAccordion } from '@/components/FilesAccordion';
import { ProjectLink } from '@/components/ProjectLink';
import { ProjectSkillsWanted } from '@/components/ProjectSkillsWanted';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectTitleAndDescription } from '@/components/ProjectTitleAndDescription';

interface HeaderProps {
  isOwnProject: boolean;
  projectData: Project;
  userData: User;
}
export function Header({ isOwnProject, projectData, userData }: HeaderProps) {
  const formattedDate = moment(projectData?.createdAt).format('MM/DD/YYYY');

  function getDomain(url: string) {
    const hostname = new URL(url).hostname;
    const domain = hostname.split('.').slice(-2, -1)[0];
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);

    return capitalizedDomain;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 mx-auto max-w-6xl lg:py-16">
        <div className="grid gap-4 px-4 mb-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
          {/* <!-- Column --> */}
          <div className="sm:col-span-2">
            <ProjectTitleAndDescription projectData={projectData} />
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Status
            </dt>
            <dd className="flex items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
              <span className="bg-green-300 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-4 sm:mb-5">
                In Progress
              </span>
            </dd>
            {projectData.links?.length > 0 && (
              <div>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Links
                </dt>
                <dd className="inline-flex items-center mb-4 space-x-1 sm:mb-5">
                  {projectData.links?.map((link) => (
                    <ProjectLink
                      key={link.id}
                      url={link.url as string}
                      title={getDomain(link.url as string)}
                    />
                  ))}
                </dd>
              </div>
            )}
          </div>
          {/* <!-- Column --> */}
          <dl>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Created By
            </dt>
            <Link href={`/users/${userData?.username}`}>
              <dd className="mb-4 ">
                <Avatar
                  className="justify-start"
                  img="/helene-engels.png"
                  rounded
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div>Jese Leos</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Joined in August 2014
                    </div>
                  </div>
                </Avatar>
              </dd>
            </Link>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Created On
            </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {formattedDate}
            </dd>
            <ProjectSkillsWanted projectData={projectData} />
            <ProjectTags projectData={projectData} />
          </dl>
        </div>
        <div
          className={`ml-4 mb-8 w-1/4 -mt-6 ${
            (!projectData?.media || projectData?.media?.length === 0) &&
            'hidden'
          }`}
        >
          <FilesAccordion media={projectData?.media as Media[]} />
        </div>
        {isOwnProject && (
          <div className="flex items-center px-4 space-x-4">
            <Link
              href={`/projects/edit/${projectData.id}`}
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                aria-hidden="true"
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Edit
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
