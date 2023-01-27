import styles from "../styles/Browse.module.css";
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";

function Browse() {
  let BACKEND_ADDRESS = "https://niflix-backend.vercel.app";
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.Nav}>
          <Nav></Nav>
        </div>
        {/* <Nav className={styles.Nav}></Nav> */}
        {/* <div className={styles.header}>
          <Header />
        </div> */}
        <div className={styles.Banner}>
          <Banner fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTopRated`} />
        </div>

        <div className={styles.rows}>
          <Row
            title={"Top Rated"}
            fetchName={"fetchTopRated"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTopRated`}
            className={styles.Row}
          />

          <Row
            title={"Trending"}
            fetchName={"fetchTrending"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTrending`}
            className={styles.Row}
          />
          <Row
            title={"Action"}
            fetchName={"fetchActionMovies"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchActionMovies`}
            className={styles.Row}
          />
          <Row
            title={"Horror"}
            fetchName={"fetchHorrorMovies"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchHorrorMovies`}
            className={styles.Row}
          />
          <Row
            title={"Romance"}
            fetchName={"fetchRomanceMovies"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchRomanceMovies`}
            className={styles.Row}
          />
          <Row
            title={"Documentaries"}
            fetchName={"fetchDocumentaries"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchDocumentaries`}
            className={styles.Row}
          />

          <Row
            title={"Comedy"}
            fetchName={"fetchComedyMovies"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchComedyMovies`}
            className={styles.Row}
          />

          <Row
            title={"Netflix Originals Movies"}
            fetchName={"fetchNetflixOriginalsTv"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchNetflixOriginalsMovies`}
            className={styles.Row}
          />
          <Row
            title={"Netflix Originals Series"}
            fetchName={"fetchNetflixOriginalsTv"}
            fetchUrl={`${BACKEND_ADDRESS}/movies/fetchNetflixOriginalsTv`}
            className={styles.Row}
          />
        </div>
      </main>
    </div>
  );
}

export default Browse;
