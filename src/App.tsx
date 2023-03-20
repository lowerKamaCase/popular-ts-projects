import React, { useCallback, useState } from "react";

import { Button, Input, Row, Table } from "antd";
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

export function App() {
  const [notification] = useNotification();
  const [repositories, setRepositories] = useState<DataType[]>();

  const handleRequest = useCallback(() => {
    requestRepos()
      .then((response) => {
        if (response.data) {
          const parsedData = JSON.parse(response.data);
          // way too big schema, so repo is just "any"
          const repos = parsedData?.map((repo: any) => {
            return {
              name: repo?.name,
              owner: repo?.owner?.login,
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
      });
  }, []);

  return (
    <div className="Wrapper">
      <div>
        <ButtonGroup>
          <Button onClick={handleRequest}>Get Repos!</Button>
        </ButtonGroup>
        {repositories && (
          <Row>
            <Table
              rowKey="id"
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
