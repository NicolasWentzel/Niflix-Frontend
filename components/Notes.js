import React from "react";
import Nav from "./Nav";
import styles from "../styles/Notes.module.css";
import Movie from "./Movie";
import { useState } from "react";
import personalNote from "../reducers/personalNote";
import { useSelector } from "react-redux";
// import "./styles.css";

function Notes() {
  const personalNotes = useSelector((state) => state.personalNote);

  const good = [personalNotes.value].map((data, i) => {
    return data.map((data, i) => {
      if (data.note === "good") {
        return <Movie key={i} {...data} />;
      }
    });
  });

  const bad = [personalNotes.value].map((data, i) => {
    return data.map((data, i) => {
      if (data.note === "bad") {
        return <Movie key={i} {...data} />;
      }
    });
  });
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Nav></Nav>
      </div>

      <div className={styles.container}>
        <div className={styles.good}>
          <h1 className="bg-gray-200 p-4">Like</h1>
          <div className={styles.movies}>{good}</div>
        </div>
        <div className={styles.bad}>
          <h1 className={styles.title}>Unlike</h1>
          <div className="">{bad}</div>
        </div>
      </div>
    </main>
  );
}

export default Notes;
