import Head from "next/head";
import { Header } from "../components/header";
import { Searcher } from "../components/searcher";
import { MovieCard } from "../components/movieCard";
import { colors } from "../styles/theme";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ElasticMovies</title>
      </Head>
      <Header/>
      <main>
        <Searcher></Searcher>
      </main>
      <MovieCard />
      <style jsx>{`
        main {
            height: 100%;
        }
      `}</style>
    </>
  );
}
