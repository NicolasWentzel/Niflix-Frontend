import Head from "next/head";
import Notes from "../components/Notes";
import styles from "../styles/Notes.module.css";

function NotesPage() {
  return (
    <>
      <Head>
        <title>Rated / Niflix</title>
      </Head>
      <Notes />
    </>
  );
}
export default NotesPage;
