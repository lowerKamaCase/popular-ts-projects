const query = {
  query: `
    query{
      search(query:"is:public language:typescript", type:REPOSITORY, first:100){
        repositoryCount
        edges{
          node{
            ... on Repository{
              name
              owner {
                login
              }
            }
          }
        }
      }
    }
  `
}
export function requestRepos() {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer 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",
    },
    body: JSON.stringify(query),
  });
}
