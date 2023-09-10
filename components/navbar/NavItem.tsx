import Link from "next/link";
import {
  FunctionComponent,
  MouseEventHandler,
  ReactComponentElement,
} from "react";

import styles from "./nav-item.module.css";

type Props = {
  text: string;
  href: string;
  active: boolean;
  onClick: any;
};

const NavItem: FunctionComponent<Props> = ({ text, href, active, onClick }) => {
  return (
    <Link
      className={`${styles.navItem} ${active ? styles.active : ""}`}
      href={href}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default NavItem;
