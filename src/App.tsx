import { Button, Row, Spin, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import type { ColumnsType } from "antd/es/table";
import { useRepositories } from "./hooks/useRepositories";
import { Repository } from "./types";

const DEFAULT_PAGINATION = { totalBoundaryShowSizeChanger: 100 };

const columns: ColumnsType<Repository> = [
  {
    title: "Repo name",
    dataIndex: "name",
  },
  {
    title: "Owner",
    dataIndex: "owner",
  },
];

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
  `,
};

export function App() {
  const { handleRequestRepositories, isLoading, repositories } =
    useRepositories();

  return (
    <div className="Wrapper">
      <div>
        <ButtonGroup>
          <Button onClick={() => handleRequestRepositories(query)}>
            Get Repos!
          </Button>
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
              pagination={DEFAULT_PAGINATION}
            />
          </Row>
        )}
      </div>
    </div>
  );
}

export default App;
