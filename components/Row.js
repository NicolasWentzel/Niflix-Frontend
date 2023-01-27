import styles from "../styles/Row.module.css";
import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Row(props) {
  // const [moviesData, setMoviesData] = useState([]);

  // useEffect(() => {
  //   fetch(props.fetchUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMoviesData(data);
  //     });
  // }, [props.fetchUrl]);

  const { data = [], isLoading } = useSWR(props.fetchUrl);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const movies = data.map((data, i) => {
    return <Movie key={i} {...data} />;
  });

  return (
    <div className={styles.row}>
      <div className={styles.rowTitle}>
        <h2 className={styles.title}>{props.title}</h2>
        {/* <button className={styles.seeMoreButton}>
          <FontAwesomeIcon
            onClick={() => toSee(props)}
            icon={faArrowRight}
            // style={styleToSee}
            // className="mustSee"
          />
        </button> */}
      </div>
      <div className={styles.seeMoreArrow}>
        <div className={styles.moviesContainer}>{movies}</div>
      </div>
    </div>
  );
}

export default Row;
