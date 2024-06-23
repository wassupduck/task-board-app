import PopoverListMenu from "../../components/PopoverListMenu";
import { TaskDeleteModal } from "../../components/TaskDeleteModal";

interface TaskActionsMenuProps {
  task: { id: string; title: string };
  onModalOpenChange: (open: boolean) => void;
}

export function TaskActionsMenu(props: TaskActionsMenuProps) {
  return (
    <PopoverListMenu onModalItemOpenChange={props.onModalOpenChange}>
      <PopoverListMenu.Trigger label="Task actions" />
      <PopoverListMenu.List align="center" sideOffset={8}>
        <PopoverListMenu.LinkItem to={`./edit`}>
          Edit Task
        </PopoverListMenu.LinkItem>
        <PopoverListMenu.ModalItem>
          {({ onOpenChange }) => (
            <TaskDeleteModal
              task={props.task}
              onOpenChange={onOpenChange}
              overlay={false}
            >
              <PopoverListMenu.Button variant="destructive">
                Delete Task
              </PopoverListMenu.Button>
            </TaskDeleteModal>
          )}
        </PopoverListMenu.ModalItem>
      </PopoverListMenu.List>
    </PopoverListMenu>
  );
}
