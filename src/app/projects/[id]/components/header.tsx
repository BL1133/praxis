import { Media, Project, User } from '@payloadTypes';
import { Avatar } from 'flowbite-react';
import moment from 'moment';
import Link from 'next/link';

import { FilesAccordion } from '@/components/FilesAccordion';
import { ProjectLink } from '@/components/ProjectLink';
import { Tag } from '@/components/Tag';

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
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="flex items-center mb-2 text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                  Praxis: A collaborative project board for developers
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 uppercase ml-2.5">
                    New
                  </span>
                </h2>
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-4 sm:mb-5">
                  <svg
                    className="mr-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Watching
                </span>
              </div>
            </div>
            <dl>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Description
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                UI/UX Designer, creating things that stand out, Featured by
                Adobe, Figma, Webflow and others, Daily design tips & resources,
                Exploring Web3.
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
                        url={link.url}
                        title={getDomain(link.url)}
                      />
                    ))}
                  </dd>
                </div>
              )}
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Status
              </dt>
              <dd className="flex items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
                <span className="bg-green-300 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-4 sm:mb-5">
                  In Progress
                </span>
              </dd>
            </dl>
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
            <dt className="font-semibold leading-none text-gray-900 dark:text-white mb-2.5">
              Skills Wanted
            </dt>
            <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
              {projectData?.skillsWanted?.map((skill) => (
                <a key={skill} href={`/`}>
                  <Tag tag={skill} />
                </a>
              ))}
            </dd>
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
