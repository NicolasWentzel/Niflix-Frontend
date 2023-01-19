import React from "react";
import styles from "../styles/Movie.module.css";
import { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeLowVision,
  faEye,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToSee, deleteMovieToSee } from "../reducers/mustSee";
import { addNote, deleteNote } from "../reducers/personalNote";
import Youtube from "react-youtube";
import { setCurrentVideo, clearCurrentVideo } from "../reducers/movie";

function Movie(props) {
  const dispatch = useDispatch();
  const [showModalMovie, setShowModalMovie] = useState(false);
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  const [mustSee, setMustSee] = useState(false);
  const [idTrailer, setIdTrailer] = useState("");
  const MovieReducer = useSelector((state) => state.movie.currentVideoId);
  const youtubeRef = useRef(null);

  /////////////////////////////////////ouverture modal

  const handleClick = (movie) => {
    console.log("Movie information before opening the modal:", movie);
    setShowModalMovie(true);
    if (MovieReducer == null) {
      fetch(`https://niflix-backend.vercel.app/movies/movieById/${movie.id}`)
        .then((res) => res.json())
        .then((data) => {
          let trailer = data.results.find(
            (result) => result.type === "Trailer"
          );
          if (trailer) {
            console.log("data trailer", trailer);
            dispatch(setCurrentVideo(trailer.key));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  /////////////////////////////////////fermeture modal
  const handleCloseModal = () => {
    dispatch(clearCurrentVideo());
    setShowModalMovie(false);
  };

  /////////////////////////////////////Is good
  const isGood = () => {
    setGood(!good);
    dispatch(addNote({ note: "good", movie: props }));
    if (bad) {
      setBad(false);
    }
  };
  const deleteGood = () => {
    setGood(false);
    dispatch(deleteNote({ movie: props }));
    if (bad) {
      setBad(false);
    }
  };

  let styleIsGood = { cursor: "pointer", fontSize: "400%" };
  if (good == true) {
    styleIsGood = { cursor: "pointer", color: "green", fontSize: "400%" };
  }
  let iconGood = (
    <FontAwesomeIcon
      onClick={() => {
        if (good) {
          deleteGood();
        } else {
          isGood();
        }
      }}
      icon={faThumbsUp}
      style={styleIsGood}
      className="isGood"
    />
  );

  /////////////////////////////////////Is bad
  const isBad = () => {
    setBad(!bad);
    dispatch(addNote({ note: "bad", movie: props }));
    if (good) {
      setGood(false);
    }
  };
  const deleteBad = () => {
    setBad(false);
    dispatch(deleteNote({ movie: props }));
    if (good) {
      setGood(false);
    }
  };
  let styleIsBad = { cursor: "pointer", fontSize: "400%" };
  if (bad == true) {
    styleIsBad = { cursor: "pointer", color: "#e74c3c", fontSize: "400%" };
  }
  let iconBad = (
    <FontAwesomeIcon
      onClick={() => {
        if (bad) {
          deleteBad();
        } else {
          isBad();
        }
      }}
      icon={faThumbsDown}
      style={styleIsBad}
      className="isBad"
    />
  );

  /////////////////////////////////////film à voir
  const toSee = (movies) => {
    setMustSee(!mustSee);
    if (mustSee !== true) {
      dispatch(addMovieToSee(movies));
    } else {
      dispatch(deleteMovieToSee(movies));
    }
  };
  let styleToSee = {
    cursor: "pointer",
    fontSize: "200%",
    paddingRight: "20px",
  };
  let iconMustSee = null;
  if (mustSee !== true) {
    // styleToSee = { cursor: "pointer", color: "#e74c3c" };
    iconMustSee = (
      <FontAwesomeIcon
        onClick={() => toSee(props)}
        icon={faEye}
        style={styleToSee}
        className="mustSee"
      />
    );
  } else {
    iconMustSee = (
      <FontAwesomeIcon
        onClick={() => toSee(props)}
        icon={faEyeLowVision}
        style={styleToSee}
        className="toSee"
      />
    );
  }

  /////////////////////////////////// JSX
  return (
    <>
      <img
        className={styles.affiche}
        src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
        // src={`https://image.tmdb.org/t/p/w500/${props.backdrop_path}`}
        alt="Poster"
        onClick={() => handleClick(props)}
        key={props.id}
      />

      <Modal
        id="widget4"
        onCancel={() => handleCloseModal()}
        open={showModalMovie}
        footer={null}
        destroyOnClose={true}
        className="modalStyle "
        width={window.innerWidth > 600 ? "50%" : "100%"}
      >
        <div className={styles.titreModal}>
          <h3 className={styles.name}>
            {props.title ? props.title : props.name}
            <span>({props.vote_average})</span>
          </h3>
          <p className={styles.mustSee}>{iconMustSee}</p>
        </div>

        {/* {idTrailer ? (
          <div id="player" style={{ height: "100%", width: "100%" }}>
            <Youtube
              ref={youtubeRef}
              videoId={idTrailer}
              opts={opts}
              onReady={() => {
                dispatch(setCurrentVideo(idTrailer));
              }}
            />
          </div>
        ) : (
          <img
            className={styles.afficheModal}
            src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
            alt="Poster"
            onClick={() => setShowModalMovie(true)}
            key={props.id}
          />
        )} */}

        <div id="player" style={{ height: "100%", width: "100%" }}>
          <Youtube
            ref={youtubeRef}
            videoId={MovieReducer}
            opts={{
              height: "100%",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
            onReady={() => {
              dispatch(setCurrentVideo(MovieReducer));
            }}
          />
        </div>

        <div className={styles.texte}>
          <p className={styles.description}>{props.overview}</p>
          <div className={styles.emoji}>
            <p className={styles.good}>{iconGood}</p>
            <p className={styles.bad}>{iconBad}</p>
          </div>
        </div>
      </Modal>

      <script src="https://www.youtube.com/iframe_api"></script>
    </>
  );
}

export default Movie;
