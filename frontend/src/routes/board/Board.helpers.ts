import { arrayMove } from "@dnd-kit/sortable";
import { LoaderData } from "./board.loader";

export function moveTask(
  taskId: string,
  dest: { boardColumnId: string; positionAfter: string },
  columns: LoaderData["board"]["columns"]["nodes"]
) {
  const srcColumn = columns.find(
    ({ tasks }) => tasks.nodes.findIndex(({ id }) => id === taskId) >= 0
  );
  const destColumn = columns.find(({ id }) => id === dest.boardColumnId);
  const movedTask = srcColumn?.tasks.nodes.find(({ id }) => id === taskId);
  const currIndex =
    srcColumn?.tasks.nodes.findIndex(({ id }) => id === taskId) ?? -1;
  if (!(srcColumn && destColumn && movedTask && currIndex >= 0)) return columns;

  let nextColumns = columns;

  let newIndex: number;
  if (dest.positionAfter === "0") {
    newIndex = 0;
  } else {
    const positionAfterIndex = destColumn.tasks.nodes.findLastIndex(
      (task) => task.position <= dest.positionAfter
    );
    const modifier =
      destColumn.id !== srcColumn.id || currIndex > positionAfterIndex ? 1 : 0;
    newIndex = positionAfterIndex + modifier;
  }

  if (srcColumn.id === destColumn.id) {
    const currIndex = srcColumn.tasks.nodes.findIndex(
      ({ id }) => id === taskId
    );
    if (currIndex >= 0 && newIndex !== currIndex) {
      nextColumns = columns.map((column) => {
        if (column.id === destColumn.id) {
          return {
            ...column,
            tasks: {
              ...column.tasks,
              nodes: arrayMove(column.tasks.nodes, currIndex, newIndex),
            },
          };
        }
        return column;
      });
    }
  } else {
    nextColumns = columns.map((column) => {
      if (column.id === srcColumn.id) {
        return {
          ...column,
          tasks: {
            ...column.tasks,
            nodes: column.tasks.nodes.filter(({ id }) => id !== movedTask.id),
          },
        };
      } else if (column.id === destColumn.id) {
        return {
          ...column,
          tasks: {
            ...column.tasks,
            nodes: [
              ...column.tasks.nodes.slice(0, newIndex),
              movedTask,
              ...column.tasks.nodes.slice(newIndex),
            ],
          },
        };
      }
      return column;
    });
  }
  return nextColumns;
}
