export const Header = () => {
  return (
    <>
      <header className="container">
        <h1 className="title">ElasticMovies</h1>
        <a
          href="https://github.com/Nakerdev/elasticsearch-movies-searcher"
          target="_blank"
        >
          <img className="github" src="/github-logo.png" />
        </a>
      </header>
      <style jsx>{`
        .container {
          min-height: 100px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 30px;
          padding-right: 30px;
        }

        .title {
          font-size: 2.8rem;
          color: white;
        }

        .github {
          width: 50px;
          height: 50px;
        }
      `}</style>
    </>
  );
};
