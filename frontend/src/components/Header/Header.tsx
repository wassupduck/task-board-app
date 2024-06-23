/// <reference types="vite-plugin-svgr/client" />
import styles from "./Header.module.css";
import breakpoints from "../../breakpoints.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";
import { Logo } from "../Logo";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MobileMenu } from "../MobileMenu";
import { BoardHeader } from "./BoardHeader";

const Header_QueryFragment = graphql(`
  fragment Header_QueryFragment on Query {
    ...MobileMenu_QueryFragment
    ...BoardHeader_QueryFragment
  }
`);

interface HeaderProps {
  sidebarHidden: boolean;
  query: FragmentType<typeof Header_QueryFragment>;
}

export function Header(props: HeaderProps) {
  const isMobile = useMediaQuery(breakpoints.mobileAndSmaller);

  const query = getFragmentData(Header_QueryFragment, props.query);

  const boardRouteData = useBoardRouteLoaderData();
  const board = boardRouteData?.board;

  return (
    <header className={styles.wrapper}>
      <div
        className={clsx(
          styles.sidebarHeader,
          props.sidebarHidden && styles.sidebarHidden
        )}
      >
        <div className={styles.siteLogo}>
          <Logo />
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div className={styles.mobileSiteLogo}>
          <Logo mobile={true} />
        </div>
        {board ? (
          <BoardHeader board={board} query={query} />
        ) : (
          isMobile && <MobileMenu query={query}>Menu</MobileMenu>
        )}
      </div>
    </header>
  );
}

export default Header;
