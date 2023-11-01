import { Accordion, Button } from 'flowbite-react';

export function FilesAccordion() {
  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>Project files</Accordion.Title>
        <Accordion.Content>
          <a
            href="https://your-backend-url/path/to/file.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 mb-3"
          >
            <p className="mt-0.5">super-cool-doc.pdf</p>
            <Button
              size="xs"
              // isProcessing
              className="text-white bg-red-600 focus:ring-4 focus:ring-red-200 dark:focus:ring-orange-800"
            >
              Remove
            </Button>
            {/* <svg
              className="w-[14px] h-[14px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
              <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
            </svg> */}
          </a>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
