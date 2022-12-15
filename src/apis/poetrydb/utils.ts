const BASE_URL = "https://poetrydb.org";
const INPUT_FIELDS = "title";
const OUTPUT_FIELDS = "author,title";
const OUTPUT_FORMAT: "text" | "json" = "json";

type GenericResponseT = {
  reason: string;
  status: number;
};

export function buildUrl(searchTerm: string) {
  // encodeURI preserves more characters than encodeURIComponent because it keeps those that are part of the URI syntax.
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
  const encodedSearchTerm = encodeURI(searchTerm);
  return `${BASE_URL}/${INPUT_FIELDS}/${encodedSearchTerm}/${OUTPUT_FIELDS}.${OUTPUT_FORMAT}`;
}

export async function parseResponse<ExpectedResponseT extends Object>(
  response: Response
) {
  if (!response.ok) {
    throw new Error("Error while fetching Poems", { cause: response });
  }

  const json: GenericResponseT | ExpectedResponseT = await response.json();

  // handling 'Not Found' or unexpected errors from API
  if ("status" in json && json.status >= 400) {
    console.warn(json);
    return [];
  }

  return json;
}
