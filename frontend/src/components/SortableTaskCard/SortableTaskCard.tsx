import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard, TaskCardProps } from "../TaskCard/TaskCard";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { Link } from "react-router-dom";

const SortableTaskCard_TaskFragment = graphql(`
  fragment SortableTaskCard_TaskFragment on Task {
    id
    ...TaskCard_TaskFragment
  }
`);

interface SortableTaskCardProps
  extends Omit<TaskCardProps, "task" | "isPlaceholder" | "isDragging"> {
  task: FragmentType<typeof SortableTaskCard_TaskFragment>;
}

export function SortableTaskCard(props: SortableTaskCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { task: _, ...rest } = props;
  const task = getFragmentData(SortableTaskCard_TaskFragment, props.task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Link to={`tasks/${task.id}`} ref={setNodeRef}>
      <TaskCard
        task={task}
        isPlaceholder={isDragging}
        {...rest}
        style={style}
        {...attributes}
        {...listeners}
      />
    </Link>
  );
}
