import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mustSee from "../reducers/mustSee";
import personalNote from "../reducers/personalNote";
import movie from "../reducers/movie";
import { SWRConfig } from "swr/_internal";

const store = configureStore({ reducer: { mustSee, personalNote, movie } });

function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher: (url) => fetch(url).then((r) => r.json()) }}>
        <Provider store={store}>
          <Head>
            <title>Niflix</title>
            <script src="https://www.youtube.com/iframe_api"></script>
          </Head>
          <Component {...pageProps} />
        </Provider>
      </SWRConfig>
    </>
  );
}

export default App;
