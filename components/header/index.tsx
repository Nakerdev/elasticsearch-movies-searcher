import { colors } from "./../../styles/theme";
import { GitHubIcon } from "./../icons/github";

export const Header = () => {
  return (
    <>
      <header>
        <h1>ElasticMovies</h1>
        <a
          href="https://github.com/Nakerdev/elasticsearch-movies-searcher"
          target="_blank"
        >
          <GitHubIcon width={50} height={50} fill={colors.secondary} />
        </a>
      </header>
      <style jsx>{`
        header {
          height: 100px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 30px;
          padding-right: 30px;
          background-color: ${colors.primary};
        }

        h1 {
          font-size: 2.8rem;
          color: ${colors.secondary};
        }
      `}</style>
    </>
  );
};
