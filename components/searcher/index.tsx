import styles from "./searcher.module.css";
import { Children } from "react";

export const Searcher = () => {
    return (
        <section className={styles.container}>
            <form className={styles.searcherContainer}>
                <input type="text" className={styles.searchInput} placeholder="The Movie name" />
                <input type="image" className={styles.searchButton} src="/search.svg" alt="a magnifying glass"/>
            </form >
            <div className={styles.moviesSearchingResultContainer}>
                <SearchingResult movieTitle="HangOver"></SearchingResult>
                <SearchingResult movieTitle="Harry Potter"></SearchingResult>
                <SearchingResult movieTitle="The Terminal"></SearchingResult>
            </div>
        </section>
    );
};

type SearchingResult = {
    movieTitle: string;
}

const SearchingResult = ({ movieTitle } : SearchingResult ) => {
    return <button className={styles.searchingResult}>{movieTitle}</button>
}
