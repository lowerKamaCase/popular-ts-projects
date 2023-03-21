import useNotification from "antd/es/notification/useNotification";
import { useCallback, useMemo, useState } from "react";
import { requestRepositories } from "../api/requestRepositories";
import { Repository } from "../types";

export function useRepositories() {
  const [notification] = useNotification();
  const [repositories, setRepositories] = useState<Repository[]>();

  const handleRequestRepositories = useCallback(() => {
    requestRepositories()
      .then((response) => {
        if (response.data) {
          const parsedData = JSON.parse(response.data);
          const repos = parsedData?.map(
            (repo: { name: string; owner: { login: string } }) => {
              return {
                name: repo?.name,
                owner: repo?.owner?.login,
              };
            }
          );
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
      });
  }, []);

  return useMemo(() => {
    return {
      repositories,
      handleRequestRepositories,
    };
  }, [repositories]);
}
