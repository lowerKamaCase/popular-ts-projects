const BASE_URL = "https://api.github.com/graphql";

export function requestRepositories(query: { query: string }) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer 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",
    },
    body: JSON.stringify(query),
  });
}
