interface ConfirmDeleteProps {
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

export function ConfirmDelete({
  isConfirmModalOpen: isOpen,
  setIsConfirmModalOpen: setIsOpen,
  handleDelete,
}: ConfirmDeleteProps) {
  return (
    <div
      id="confirmModal"
      tabIndex={-1}
      className={`
      ${isOpen ? '' : 'hidden'}
       overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center shadow-elevation-medium rounded-lg`}
    >
      <div className="relative w-full max-w-md max-h-full ">
        <div className="relative bg-white  dark:bg-gray-700">
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-6 text-md font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this project?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I&rsquo;m sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
