import React from "react";
import Nav from "./Nav";
import styles from "../styles/Notes.module.css";
import Movie from "./Movie";
import { useState } from "react";
import personalNote from "../reducers/personalNote";
import { useSelector } from "react-redux";

function Notes() {
  const [moviesData, setMoviesData] = useState([]);
  const personalNotes = useSelector((state) => state.personalNote);

  console.log(personalNotes);

  const movies = [personalNotes].map((data, i) => {
    return <Movie key={i} {...data} />;
  });
  return (
    <div>
      <main className={styles.main}>
        <Nav></Nav>

        {movies}
      </main>
    </div>
  );
}

export default Notes;
