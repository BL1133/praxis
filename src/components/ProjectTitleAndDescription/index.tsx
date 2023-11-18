import { Project } from '@payloadTypes';

export function ProjectTitleAndDescription({
  projectData,
}: {
  projectData: Project;
}) {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="flex items-center mb-3 text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
            {projectData?.title}
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 uppercase ml-2.5">
              New
            </span>
          </h2>
          {/* Watching functionality */}
          {/* <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-4 sm:mb-5">
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
                </span> */}
        </div>
      </div>

      <div>
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white text">
          Description
        </dt>
        <dd className="mb-4 w-11/12 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
          {projectData?.shortDescription}
        </dd>
      </div>
    </>
  );
}
