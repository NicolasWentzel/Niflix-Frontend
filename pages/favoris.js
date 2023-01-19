import Head from "next/head";
import Favoris from "../components/Favoris";
import styles from "../styles/Favoris.module.css";

function FavorisPage() {
  return (
    <>
      <Head>
        <title>Favoris / Niflix</title>
      </Head>
      <Favoris />
    </>
  );
}
export default FavorisPage;
