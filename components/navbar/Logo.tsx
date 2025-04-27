import styles from "./logo.module.css";

import logo from "../../public/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src={logo} width={130} alt="logo" priority={true} />
    </div>
  );
};

export default Logo;
