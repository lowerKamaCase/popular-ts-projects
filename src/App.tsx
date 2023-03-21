import { Button, Row, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import type { ColumnsType } from "antd/es/table";
import { useRepositories } from "./hooks/useRepositories";
import { Repository } from './types';

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

export function App() {
  const { handleRequestRepositories, repositories } = useRepositories();

  return (
    <div className="Wrapper">
      <div>
        <ButtonGroup>
          <Button onClick={handleRequestRepositories}>Get Repos!</Button>
        </ButtonGroup>
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
