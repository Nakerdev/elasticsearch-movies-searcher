import Head from "next/head";
import { Searcher } from "../components/searcher";
import { Modal } from "../components/modal";
import { MovieCard } from "../components/movieCard";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ElasticMovies</title>
      </Head>
      <main className={styles.background}>
        <Searcher></Searcher>
      </main>
      <Modal>
        <MovieCard/>
      </Modal>
    </>
  );
}
