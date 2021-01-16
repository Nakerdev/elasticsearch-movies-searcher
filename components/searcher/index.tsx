import styles from "./searcher.module.css";

export const Searcher = () => {
    return (
        <form className={styles.container}>
            <input type="text" className={styles.searchInput} />
            <button className={styles.searchButton}>Buscar</button>
        </form >
    );
};
