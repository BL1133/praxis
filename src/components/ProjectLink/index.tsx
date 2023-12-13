import { Tooltip } from 'flowbite-react';

export function ProjectLink({ url, title }: { url: string; title: string }) {
  return (
    <Tooltip content={url}>
      <a
        href={url}
        data-tooltip-target="tooltip-facebook"
        className="flex gap-2 p-2 text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <p className="text-md font-semibold mt-0.5 text-cyan-600 ">{title}</p>
        <svg
          className="w-[10px] h-[10px] text-cyan-600 dark:text-cyan-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
          <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
        </svg>
      </a>
    </Tooltip>
  );
}
