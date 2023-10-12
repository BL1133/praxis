import Link from 'next/link';
import React from 'react';

export default function BadStatusPage({ statusCode }: { statusCode: number }) {
  interface ErrorMessage {
    [key: number]: {
      title: string;
      message: string;
    };
  }
  const messages: ErrorMessage = {
    403: {
      title: 'Forbidden',
      message:
        "Sorry, you don't have access to this page. Please sign in to view it.",
    },
    404: {
      title: 'Page not found',
      message:
        "Sorry, we can't find that page. You'll find lots to explore on the home page.",
    },
    500: {
      title: 'Server error',
      message:
        "Sorry, we're having technical difficulties. We're working on it.",
    },
  };

  return (
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center h-screen mt-[-68px]">
      <div className="text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          {statusCode}
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          {messages[statusCode].title}
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {messages[statusCode].message}
        </p>
        <Link
          href="/"
          className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
