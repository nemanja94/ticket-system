"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Links = [
  { name: "Pocetna", link: "/" },
  { name: "Musterije", link: "/customers" },
  { name: "Vozila", link: "/vehicles" },
  { name: "Tiketi", link: "/tickets" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [activLink, setActiveLink] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActiveLink(`/${pathname.split("/")[1]}`);
  }, [pathname]);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoContainer}>
        <span className={styles.logo}>
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
        </span>
      </div>

      <div
        className={`${styles.linksContainer} ${
          active ? "top-[4.5rem]" : "top-[-1000px]"
        }`}
      >
        {Links.map((link, i) => {
          return (
            <div key={i} className={styles.link}>
              <Link
                href={link.link}
                className={`${
                  activLink === link.link
                    ? styles.activeLink
                    : styles.inactiveLink
                }`}
                onClick={() => setActive(!active)}
              >
                <div className="flex gap-2">{link.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
