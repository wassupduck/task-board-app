/// <reference types="vite-plugin-svgr/client" />
import breakpoints from "../../breakpoints.module.css";
import { BoardDeleteModal } from "../BoardDeleteModal";
import { useMediaQuery } from "@uidotdev/usehooks";
import PopoverListMenu from "../PopoverListMenu";

interface BoardActionsMenuProps {
  board: {
    id: string;
    name: string;
  };
}

export function BoardActionsMenu(props: BoardActionsMenuProps) {
  const isTabletOrSmaller = useMediaQuery(breakpoints.tabletAndSmaller);
  const isMobileOrSmaller = useMediaQuery(breakpoints.mobileAndSmaller);

  return (
    <PopoverListMenu>
      <PopoverListMenu.Trigger label="Board actions" />
      <PopoverListMenu.List
        align="end"
        sideOffset={isMobileOrSmaller ? 24 : isTabletOrSmaller ? 28 : 32}
      >
        <PopoverListMenu.LinkItem to={`boards/${props.board.id}/edit`}>
          Edit Board
        </PopoverListMenu.LinkItem>
        <PopoverListMenu.ModalItem>
          {({ onOpenChange }) => (
            <BoardDeleteModal board={props.board} onOpenChange={onOpenChange}>
              <PopoverListMenu.Button variant="destructive">
                Delete Board
              </PopoverListMenu.Button>
            </BoardDeleteModal>
          )}
        </PopoverListMenu.ModalItem>
      </PopoverListMenu.List>
    </PopoverListMenu>
  );
}
