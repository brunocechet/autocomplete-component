import { buildUrl, parseResponse } from "./utils";

type SearchResponseItemT = {
  author: string;
  id: string;
  title: string;
};

// avoid duplicated requests by storing previous results by the search term.
const memoizedResultsBySearchTerm: Record<string, SearchResponseItemT[]> = {};

export async function searchPoemsByTitle(
  searchTerm: string
): Promise<SearchResponseItemT[]> {
  if (memoizedResultsBySearchTerm[searchTerm]) {
    return memoizedResultsBySearchTerm[searchTerm];
  }

  const URL = buildUrl(searchTerm);
  const response = await fetch(URL);
  const parsedResponse = await parseResponse<SearchResponseItemT[]>(response);

  if (Array.isArray(parsedResponse)) {
    const parsedResponseWithId = parsedResponse
      // creates a dummy id by removing everything but letters to have a unique identifier
      .map((item) => ({
        ...item,
        id: `${item.author}-${item.title}`.replace(/\W/gi, "_"),
      }));

    // `Intl.Collator` with `sensitivity` as `base` provides case insensitive support.
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator#using_options
    // sorted in place (mutates parsedResponseWithId)
    parsedResponseWithId.sort((a, b) => {
      return new Intl.Collator("en", {
        sensitivity: "base",
        usage: "sort",
      }).compare(a.title, b.title);
    });

    memoizedResultsBySearchTerm[searchTerm] = parsedResponseWithId;

    return memoizedResultsBySearchTerm[searchTerm];
  }

  return [];
}
