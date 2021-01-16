import Head from "next/head";
import { Searcher } from "../components/searcher";

import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Home | ElasticMovies</title>
            </Head>
            <main>
              <Searcher></Searcher>
            </main>
        </>
    );
}
