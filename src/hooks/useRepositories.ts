import useNotification from "antd/es/notification/useNotification";
import { useCallback, useMemo, useState } from "react";
import { requestRepositories } from "../api/requestRepositories";
import { Repository, ResponseRepository } from "../types";

export function useRepositories() {
  const [notification] = useNotification();

  const [repositories, setRepositories] = useState<Repository[]>();

  const [isLoading, setIsLoading] = useState(false);

  const handleRequestRepositories = useCallback((query: { query: string }) => {
    setIsLoading(true);
    requestRepositories(query)
      .then((resp) => resp.json())
      .then((response: {data: { search: { edges: ResponseRepository[]}}}) => {
        if (response?.data?.search?.edges) {
          const edges = response.data.search.edges;
          const repos = edges.map((repo: ResponseRepository) => {
            return {
              name: repo.node.name,
              owner: repo.node.owner.login,
            };
          });
          setRepositories(repos);
        } else {
          notification.warning({ message: "No data in response" });
        }
      })
      .catch((error) => {
        console.log(error);
        notification.warning({
          message: error.message || "Something went wrong",
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return useMemo(() => {
    return {
      repositories,
      isLoading,
      handleRequestRepositories,
    };
  }, [isLoading, repositories]);
}
