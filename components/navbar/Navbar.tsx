"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import NavItem from "./NavItem";
import styles from "./navbar.module.css";

type NavItemType = {
  text: string;
  href: string;
};

const Navbar = () => {
  const pathname = usePathname();

  const navItems = useMemo<readonly NavItemType[]>(
    () => [
      { text: "Musterije", href: "/customers" },
      { text: "Vozila", href: "/vehicles" },
      { text: "Tiketi", href: "/tickets" },
    ],
    []
  );

  return (
    <nav className={`${styles.navbar}`}>
      {navItems.map((item) => (
        <NavItem key={item.text} {...item} active={pathname === item.href} />
      ))}
    </nav>
  );
};

export default Navbar;
