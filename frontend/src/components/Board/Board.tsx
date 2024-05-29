import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  getFirstCollision,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Board.module.css";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTaskCard } from "../SortableTaskCard/SortableTaskCard";
import { useCallback, useState } from "react";

const Board_BoardFragment = graphql(`
  fragment Board_BoardFragment on Board {
    columns {
      nodes {
        id
        tasks {
          nodes {
            id
            column {
              id
            }
            ...TaskCard_TaskFragment
          }
        }
        ...Column_BoardColumnFragment
      }
    }
  }
`);

export interface BoardProps {
  board: FragmentType<typeof Board_BoardFragment>;
  onTaskMove: (taskId: string, columnId: string, index: number) => void;
}

export function Board(props: BoardProps) {
  const board = getFragmentData(Board_BoardFragment, props.board);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overColumnEntrypoint, setOverColumnEntrypoint] = useState<{
    id: string;
    index: number;
  } | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeTask = board.columns.nodes
    .flatMap(({ tasks }) => tasks.nodes)
    .find(({ id }) => id === activeId);

  const columns = (() => {
    if (activeTask && overColumnEntrypoint) {
      // Move task to over column entrypoint
      return board.columns.nodes.map((column) => {
        if (column.id === activeTask.column.id) {
          // Remove active task from it's server-state column
          column = {
            ...column,
            tasks: {
              ...column.tasks,
              nodes: column.tasks.nodes.filter(
                (task) => task.id !== activeTask.id
              ),
            },
          };
        }
        if (column.id === overColumnEntrypoint.id) {
          // Add active task at entrypoint index
          column = {
            ...column,
            tasks: {
              ...column.tasks,
              nodes: [
                ...column.tasks.nodes.slice(0, overColumnEntrypoint.index),
                activeTask,
                ...column.tasks.nodes.slice(overColumnEntrypoint.index),
              ],
            },
          };
        }
        return column;
      });
    }
    return board.columns.nodes;
  })();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setOverColumnEntrypoint(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over === null || over.id === activeTask?.id) {
      return;
    }

    const overColumnId = over.id.toString().startsWith("column")
      ? over.id.toString().split(/:(.*)/s)[1]
      : columns
          .flatMap(({ tasks }) => tasks.nodes)
          .find(({ id }) => id === over.id)?.column.id;
    const overColumn = columns.find(({ id }) => id === overColumnId);

    if (!overColumn) {
      return;
    }

    const activeCurrColumnId =
      overColumnEntrypoint?.id ?? activeTask?.column.id;

    if (activeCurrColumnId === overColumn.id) {
      return;
    }

    const overColumnTasks = overColumn.tasks.nodes;
    const overIndex = overColumnTasks.findIndex(({ id }) => id === over.id);

    let newIndex: number;

    if (over.id.toString().startsWith("column")) {
      newIndex = overColumnTasks.length + 1;
    } else {
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newIndex =
        overIndex >= 0 ? overIndex + modifier : overColumnTasks.length + 1;
    }

    setOverColumnEntrypoint({
      id: overColumn.id,
      index: newIndex,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    moveTask: if (activeTask && over) {
      const overColumn = columns.find(
        (column) =>
          column.tasks.nodes.findIndex(({ id }) => id === over.id) >= 0
      );
      const overIndex = overColumn?.tasks.nodes.findIndex(
        ({ id }) => id === over.id
      );
      const activeColumn = board.columns.nodes.find(
        (column) => column.id === activeTask.column.id
      );
      const activeIndex = activeColumn?.tasks.nodes.findIndex(
        ({ id }) => id === activeTask.id
      );

      if (
        !overColumn ||
        overIndex === undefined ||
        !activeColumn ||
        activeIndex === undefined ||
        overIndex < 0 ||
        activeIndex < 0
      ) {
        break moveTask;
      }

      if (!(overColumn.id === activeColumn.id && overIndex === activeIndex)) {
        props.onTaskMove(activeTask.id, overColumn.id, overIndex);
      }
    }

    setActiveId(null);
    setOverColumnEntrypoint(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverColumnEntrypoint(null);
  };

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId.toString().startsWith("column")) {
          const columnId = overId.toString().split(/:(.*)/s)[1];
          const columnTasks = columns
            .find(({ id }) => id === columnId)!
            .tasks.nodes.map(({ id }) => id);

          // If a column is matched and it contains tasks
          if (columnTasks.length > 0) {
            // Return the closest droppable within that column
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => columnTasks.includes(container.id.toString())
              ),
            })[0]?.id;
          }
        }

        return [{ id: overId }];
      }

      // Return closest droppable if not intersecting with any
      return closestCorners(args);
    },
    [columns]
  );

  return (
    <div className={styles.board}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <DragOverlay wrapperElement="ul">
          {activeTask ? <TaskCard task={activeTask} isDragging={true} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

const Column_BoardColumnFragment = graphql(`
  fragment Column_BoardColumnFragment on BoardColumn {
    id
    name
    tasks {
      totalCount
      nodes {
        id
        ...SortableTaskCard_TaskFragment
      }
    }
  }
`);

interface ColumnProps {
  column: FragmentType<typeof Column_BoardColumnFragment>;
}

function Column(props: ColumnProps) {
  const column = getFragmentData(Column_BoardColumnFragment, props.column);

  const { setNodeRef } = useDroppable({
    id: `column:${column.id}`,
  });

  const tasks = column.tasks.nodes;

  return (
    <section className={styles.column}>
      <h2 className={styles.columnHeader}>
        {column.name} ({column.tasks.totalCount})
      </h2>
      <ol ref={setNodeRef} className={styles.columnTaskList}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </ol>
    </section>
  );
}
