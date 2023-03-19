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
      Authorization: `bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(query),
  });
}
