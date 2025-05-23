import Link from "next/link";

import styles from "./nav-item.module.css";

interface NavItemProps {
  text: string;
  href: string;
  active: boolean;
}

const NavItem = ({ text, href, active }: NavItemProps) => {
  return (
    <Link
      className={`${styles.navItem} ${active ? styles.active : ""}`}
      href={href}
    >
      {text}
    </Link>
  );
};

export default NavItem;
