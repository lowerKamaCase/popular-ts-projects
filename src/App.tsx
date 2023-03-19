import React, { useCallback, useState } from "react";

import { Button, Row, Spin, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import useNotification from "antd/es/notification/useNotification";
import type { ColumnsType } from "antd/es/table";
import { requestRepos } from "./request";
import "./App.css";

interface DataType {
  key: React.Key;
  name: string;
  owner: string;
  stargazers_count: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Repo name",
    dataIndex: "name",
  },
  {
    title: "Owner",
    dataIndex: "owner",
  },
];

type Repository = { node: { name: string; owner: { login: string } } };

export function App() {
  const [notification] = useNotification();
  const [repositories, setRepositories] = useState<DataType[]>();

  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    requestRepos()
      .then((resp) => resp.json())
      .then((response) => {
        if (response?.data?.search?.edges) {
          const parsedData = response.data.search.edges;
          const repos = parsedData.map((repo: Repository) => {
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

  return (
    <div className="Wrapper">
      <div>
        <ButtonGroup>
          <Button onClick={handleRequest}>Get Repos!</Button>
        </ButtonGroup>
        {isLoading && (
          <div>
            <Spin />
          </div>
        )}
        {repositories && (
          <Row>
            <Table
              rowKey="name"
              dataSource={repositories}
              columns={columns}
              pagination={{ totalBoundaryShowSizeChanger: 100 }}
            />
          </Row>
        )}
      </div>
    </div>
  );
}

export default App;
