import styles from "../styles/Banner.module.css";
import React, { useEffect, useState, useRef } from "react";
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

function Banner(props) {
  const [movie, setMovie] = useState([]);
  const [showModalMovie, setShowModalMovie] = useState(false);
  const dispatch = useDispatch();
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  const [mustSee, setMustSee] = useState(false);
  const [idTrailer, setIdTrailer] = useState("");
  const MovieReducer = useSelector((state) => state.movie.currentVideoId);
  const youtubeRef = useRef(null);

  useEffect(() => {
    fetch(props.fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data[Math.floor(Math.random() * data.length - 1)]);
      });
  }, [props.fetchUrl]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  console.log("Les infos du movie", movie);

  const handleClick = (movie) => {
    console.log("Movie information before opening the modal:", movie);
    setShowModalMovie(true);
    if (MovieReducer == null && movie && movie.id) {
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
    dispatch(addNote({ note: "good", movie: movie }));
    if (bad) {
      setBad(false);
    }
  };
  const deleteGood = () => {
    setGood(false);
    dispatch(deleteNote({ movie: movie }));
    if (bad) {
      setBad(false);
    }
  };

  let styleIsGood = { cursor: "pointer", fontSize: "200%", paddingTop: "5px" };
  if (good == true) {
    styleIsGood = {
      cursor: "pointer",
      color: "green",
      fontSize: "200%",
      paddingTop: "5px",
    };
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
    dispatch(addNote({ note: "bad", movie: movie }));
    if (good) {
      setGood(false);
    }
  };
  const deleteBad = () => {
    setBad(false);
    dispatch(deleteNote({ movie: movie }));
    if (good) {
      setGood(false);
    }
  };
  let styleIsBad = { cursor: "pointer", fontSize: "200%", paddingTop: "5px" };
  if (bad == true) {
    styleIsBad = {
      cursor: "pointer",
      color: "#e74c3c",
      fontSize: "200%",
      paddingTop: "5px",
    };
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
        onClick={() => toSee(movie)}
        icon={faEye}
        style={styleToSee}
        className="mustSee"
      />
    );
  } else {
    iconMustSee = (
      <FontAwesomeIcon
        onClick={() => toSee(movie)}
        icon={faEyeLowVision}
        style={styleToSee}
        className="toSee"
      />
    );
  }

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`
          : "none",

        backgroundPosition: "center center",
      }}
    >
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className={styles.bannerButtons}>
          <button
            className={styles.bannerButton}
            onClick={() => handleClick(movie)}
          >
            Play
          </button>
          <button
            className={styles.bannerButton}
            onClick={() => handleClick(movie)}
          >
            More Info
          </button>
        </div>
        <h1 className={styles.bannerDescription}>
          {truncate(movie?.overview, 150)}{" "}
        </h1>
      </div>
      <div className={styles.emptyBanner}></div>
      <Modal
        id="widget4"
        onCancel={() => handleCloseModal()}
        open={showModalMovie}
        destroyOnClose={true}
        footer={null}
        className="modalStyle "
        // width={window.innerWidth > 600 ? "50%" : "100%"}
      >
        <div className={styles.titreModal}>
          <h3 className={styles.name}>
            {movie && movie.title
              ? movie.title
              : movie && movie.name
              ? movie.name
              : "Titre inconnu"}
            <span>
              {movie && movie.vote_average
                ? ` (${movie.vote_average})`
                : "(Inconnu)"}
            </span>
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
          <p className={styles.description}>
            {movie && movie.overview
              ? movie.overview
              : "Aucune description disponible."}
          </p>
          <div className={styles.emoji}>
            <p className={styles.good}>{iconGood}</p>
            <p className={styles.bad}>{iconBad}</p>
          </div>
        </div>
      </Modal>
    </header>
  );
}

export default Banner;
