import styles from "./header.module.css";

export const Header = () => {
    return (
        <header className={styles.container}>
            <h1 className={styles.title}>ElasticMovies</h1>
        </header>
    );
};
