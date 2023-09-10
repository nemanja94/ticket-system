"use client";

import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import styles from "./navbar.module.css";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { text: "Pocetna", href: "/", active: true },
  { text: "Musterije", href: "/customers", active: false },
  { text: "Vozila", href: "/vehicles", active: false },
  { text: "Tiketi", href: "/tickets", active: false },
];

const Navbar = () => {
  const pathName = usePathname();
  const [isClicked, setIsClicked] = useState("");

  useEffect(() => {
    setIsClicked(pathName.split(" ")[0]);
  }, [pathName]);

  const clickHandler: any = (href: string) => {
    setIsClicked(href);
  };

  return (
    <nav className={styles.navbar}>
      {navItems.map((navItem) => {
        return (
          <NavItem
            key={navItem.text}
            text={navItem.text}
            href={navItem.href}
            active={isClicked === navItem.href ? true : false}
            onClick={() => clickHandler(navItem.href)}
          />
        );
      })}
    </nav>
  );
};

export default Navbar;
