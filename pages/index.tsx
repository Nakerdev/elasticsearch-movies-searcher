import Head from "next/head";
import { Searcher } from "../components/searcher";
import { MovieCard } from "../components/movieCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ElasticMovies</title>
      </Head>
      <main>
        <Searcher></Searcher>
      </main>
      <MovieCard />
    </>
  );
}
