// import "antd/dist/antd.css";
import React from "react";
import styles from "../styles/Header.module.css";
import { Popover, Button } from "antd";

function Header() {
  const content = (
    <div>
      <p>Movie Nico</p>
      <p>Movie Hedi</p>
    </div>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img className={styles.logo} src="niflix.png" alt="Logo" />
        </div>
        <div>
          <Popover content={content} title="Movies">
            {/* <Button className={styles.btn}>♥ 4 movie(s)</Button> */}
            <img className={styles.logo} src="favicon.ico" alt="Profil" />
          </Popover>
        </div>
      </div>
    </>
  );
}

export default Header;
