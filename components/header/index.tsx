import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>ElasticMovies</h1>
      <a
        href="https://github.com/Nakerdev/elasticsearch-movies-searcher"
        target="_blank"
      >
        <img className={styles.github} src="/github-logo.png" />
      </a>
    </header>
  );
};
