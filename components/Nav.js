import React, { useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const toNotes = () => {
    router.push("/notes");
  };

  const toFavoris = () => {
    router.push("/favoris");
  };

  const toProfile = () => {
    router.push("/profile");
  };

  const toBrowse = () => {
    router.push("/browse");
  };

  let handleScroll = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.nav} ${show && styles.nav_black}`}>
      <div className={`${styles.block1} ${styles.cursor}`}>
        <img
          className={styles.logo}
          src="niflix.png"
          alt="Niflix Logo"
          onClick={() => toBrowse()}
        />
      </div>
      {/* <div className={`${styles.block2} `}>
        <span
          className={`${styles.liste} ${styles.cursor}`}
          onClick={() => toBrowse()}
        >
          Accueil
        </span>
        <span
          className={`${styles.liste} ${styles.cursor}`}
          onClick={() => toNotes()}
        >
          Notes
        </span>
        <span
          className={`${styles.liste} ${styles.cursor}`}
          onClick={() => toFavoris()}
        >
          Favoris
        </span>
      </div> */}
      <div
        className={`${styles.block3} ${styles.cursor}`}
        // onClick={() => toProfile()}
      >
        <img
          className={styles.avatar}
          src="Netflix-avatar.png"
          alt="Netflix-avatar.png"
        />
      </div>
    </div>
  );
}

export default Nav;
