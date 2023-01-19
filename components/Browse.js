import styles from "../styles/Browse.module.css";
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";

function Browse() {
  let BACKEND_ADDRESS = "http://localhost:3000";
  return (
    <div>
      <main className={styles.main}>
        <Nav></Nav>
        {/* <div className={styles.header}>
          <Header />
        </div> */}
        <Banner fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTopRated`} />

        <Row
          title={"Top Rated"}
          fetchName={"fetchTopRated"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTopRated`}
        />
        <Row
          title={"Trending"}
          fetchName={"fetchTrending"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchTrending`}
        />
        <Row
          title={"Action"}
          fetchName={"fetchActionMovies"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchActionMovies`}
        />
        <Row
          title={"Horror"}
          fetchName={"fetchHorrorMovies"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchHorrorMovies`}
        />
        <Row
          title={"Romance"}
          fetchName={"fetchRomanceMovies"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchRomanceMovies`}
        />
        <Row
          title={"Documentaries"}
          fetchName={"fetchDocumentaries"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchDocumentaries`}
        />

        <Row
          title={"Comedy"}
          fetchName={"fetchComedyMovies"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchComedyMovies`}
        />

        <Row
          title={"Netflix Originals Movies"}
          fetchName={"fetchNetflixOriginalsTv"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchNetflixOriginalsMovies`}
        />
        <Row
          title={"Netflix Originals Series"}
          fetchName={"fetchNetflixOriginalsTv"}
          fetchUrl={`${BACKEND_ADDRESS}/movies/fetchNetflixOriginalsTv`}
        />
      </main>
    </div>
  );
}

export default Browse;
