import styles from "./searcher.module.css";

export const Searcher = () => {
    return (
        <form className={styles.container}>
            <input type="text" className={styles.input} placeholder="The Movie name" />
            <input type="image" className={styles.searchButton} src="/search.svg" alt="a magnifying glass"/>
        </form >
    );
};
