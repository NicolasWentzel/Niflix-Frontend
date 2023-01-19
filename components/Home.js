import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Bounce from "react-reveal/Bounce";

const Home = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationTriggered(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (animationTriggered) {
      setTimeout(() => {
        window.location.href = "/browse";
      }, 1500);
    }
  }, [animationTriggered]);

  return (
    <div className={styles.main}>
      {animationTriggered && (
        <Bounce left>
          <h1 className={styles.title}>
            <span>N</span>
            <span>I</span>
            <span>F</span>
            <span>L</span>
            <span>I</span>
            <span>X</span>
          </h1>
        </Bounce>
      )}
    </div>
  );
};

export default Home;
