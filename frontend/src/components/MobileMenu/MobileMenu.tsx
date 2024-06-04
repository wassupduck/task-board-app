/// <reference types="vite-plugin-svgr/client" />
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import ChevronUpIcon from "../../assets/icon-chevron-up.svg?react";
import { useFetcher, useLocation } from "react-router-dom";
import BoardNav from "../BoardNav";
import styles from "./MobileMenu.module.css";
import * as Popover from "@radix-ui/react-popover";
import ThemeToggle from "../ThemeToggle";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useEffect, useState } from "react";

const MobileMenu_QueryFragment = graphql(`
  fragment MobileMenu_QueryFragment on Query {
    ...BoardNav_QueryFragment
  }
`);

export interface BoardNavProps {}

interface MobileMenuProps {
  query: FragmentType<typeof MobileMenu_QueryFragment>;
  children: React.ReactNode;
}

export function MobileMenu(props: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [hasOpenModal, setHasOpenModal] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleModalOpenChange(open: boolean) {
    setHasOpenModal(open);
    if (open === false) {
      setOpen(false);
    }
  }

  const fetcher = useFetcher();
  const handleLogout = () => {
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });
  };

  const query = getFragmentData(MobileMenu_QueryFragment, props.query);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button aria-label="Menu" className={styles.triggerButton}>
          {props.children}
          {open && !hasOpenModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <div hidden={hasOpenModal}>
          <div className={styles.overlay}></div>
          <Popover.Content
            align={"start"}
            sideOffset={36}
            className={styles.content}
          >
            <BoardNav
              query={query}
              onModalOpenChange={handleModalOpenChange}
              activeLinkOffset={"-24px"}
            />
            <div>
              <div className={styles.themeToggleWrapper}>
                <ThemeToggle />
              </div>
              <button className={styles.menuButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </Popover.Content>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}
