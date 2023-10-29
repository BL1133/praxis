import { Project, User } from '@payloadTypes';
import { Avatar, Badge } from 'flowbite-react';
import Link from 'next/link';

interface HeaderProps {
  isOwnProject: boolean;
  projectData: Project;
  userData: User;
}
export function Header({ isOwnProject, projectData, userData }: HeaderProps) {
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
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Links
              </dt>
              <dd className="inline-flex items-center mb-4 space-x-1 sm:mb-5">
                <a
                  href="/"
                  data-tooltip-target="tooltip-facebook"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <div
                  id="tooltip-facebook"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Facebook profile
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <a
                  href="/"
                  data-tooltip-target="tooltip-facebook"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <div
                  id="tooltip-instagram"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Instagram profile
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <a
                  href="/"
                  data-tooltip-target="tooltip-github"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </a>
                <div
                  id="tooltip-github"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  GitHub profile
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <a
                  href="/"
                  data-tooltip-target="tooltip-dribbble"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Dribbble</span>
                </a>
                <div
                  id="tooltip-dribbble"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Dribbble profile
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </dd>
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
              10/10/2023
            </dd>
            <dt className="font-semibold leading-none text-gray-900 dark:text-white mb-2.5">
              Skills Wanted
            </dt>
            <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
              <Badge href="/" color="gray">
                Designer
              </Badge>
              <Badge href="/" color="gray">
                Frontend Developer
              </Badge>
              <Badge href="/" color="gray">
                Backend Developer
              </Badge>
              <Badge href="/" color="gray">
                Maintainer
              </Badge>
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Tags
            </dt>
            <dd className="flex gap-2 flex-wrap items-center mb-4 text-gray-900 sm:mb-5 dark:text-white">
              <Badge href="/" color="gray">
                Platform
              </Badge>
              <Badge href="/" color="gray">
                frontend
              </Badge>
              <Badge href="/" color="gray">
                react
              </Badge>
              <Badge href="/" color="gray">
                design
              </Badge>
              <Badge href="/" color="gray">
                portfolio
              </Badge>
              <Badge href="/" color="gray">
                longterm
              </Badge>
              <Badge href="/" color="gray">
                experienced
              </Badge>
              <Badge href="/" color="gray">
                junior
              </Badge>
            </dd>
          </dl>
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
