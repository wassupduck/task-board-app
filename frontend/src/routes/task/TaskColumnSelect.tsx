import { FragmentType, getFragmentData, graphql } from "../../gql";
import Select from "../../components/Select";

const TaskColumnSelect_BoardColumnFragment = graphql(`
  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {
    id
    name
  }
`);

interface TaskColumnSelectProps {
  selectedColumnId: string;
  boardColumns: FragmentType<typeof TaskColumnSelect_BoardColumnFragment>[];
  onColumnChange: (columnId: string) => void;
}

export function TaskColumnSelect(props: TaskColumnSelectProps) {
  const boardColumns = getFragmentData(
    TaskColumnSelect_BoardColumnFragment,
    props.boardColumns
  );
  return (
    <Select
      id="status"
      value={props.selectedColumnId}
      onValueChange={props.onColumnChange}
    >
      {boardColumns.map((column) => (
        <Select.Item key={column.id} value={column.id}>
          {column.name}
        </Select.Item>
      ))}
    </Select>
  );
}
