import { useMatches } from "@remix-run/react";

export const Breadcrumbs = () => {
  const matches = useMatches();

  const breadcrumbs = matches.filter(
    (match) => match.handle && match.handle.breadcrumb
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-stone-500">
        {breadcrumbs.map((match, index) => (
          <li
            key={index}
            className="flex items-center transition-colors hover:text-stone-700"
            // isCurrentPage={breadcrumbs.length === index + 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">
              {match.handle!.breadcrumb(match)}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};
