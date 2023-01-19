import Head from "next/head";
import Home from "../components/Home";

function Index() {
  return (
    <>
      <Head>
        <title>Home / Niflix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Home />
    </>
  );
}

export default Index;
