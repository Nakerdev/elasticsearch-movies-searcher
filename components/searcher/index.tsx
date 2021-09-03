import React, {useState, useEffect} from "react";
import { colors } from "./../../styles/theme";
import { Movie } from "./../../pages/api/movies/movieRepository";
import { searchMovies } from "./moviesClient";
import {
  AppContext,
  ShowMovieAction
} from "./../appProvider/index";

export const Searcher = () => {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesSearchingCriteria, setmoviesSearchingCriteria] = useState("");

  useEffect(() => {
    searchMovies(moviesSearchingCriteria)
    .then(foundMovies => setMovies(foundMovies))
    .catch(_ => setMovies([]));
  }, [moviesSearchingCriteria])

  return (
    <>
      <section>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="The Movie name"
            onChange={(e) => setmoviesSearchingCriteria(e.target.value)}
            value={moviesSearchingCriteria}
          />
        </form>
        <MoviesList movies={movies}/>
      </section>
      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        input {
          font-size: 1.5rem;
          color: grey;
          padding: 5px 20px;
          border-radius: 5px;
          border: none;
          min-width: 800px;
          height: 60px;
          margin-top: 20px;
          outline: none;
        }
      `}</style>
    </>
  );
};

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList = ({movies}: MoviesListProps) => {
  if (movies.length == 0) return "";
  return (
    <>
      <div>
        {movies.map((movie, index) => (
          <MovieItem key={index} movie={movie}></MovieItem>
        ))}
      </div>
      <style jsx>{`
        div {
          margin-top: 20px;
          width: 90%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

interface MovieItemProps {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <>
      <article>
        {movie.title}
        <div className="genres-container">
          {movie.genres.map((gender, index) => {
            const key = `gender-${index}`;
            return <p key={key}>{gender}</p>;
          })}
        </div>
        <button onClick={() => dispatch(new ShowMovieAction(movie))}>
          DETAILS
        </button>
      </article>
      <style jsx>{`
        article {
          width: 100%;
          background: white;
          margin-bottom: 10px;
          padding: 20px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          font-size: 1.3rem;
          font-weight: bold;
          letter-spacing: 1.5px;
        }

        button {
          border: none;
          background-color: ${colors.secondary};
          padding: 10px 20px;
          color: ${colors.white};
          font-weight: bold;
          border-radius: 10px;
          letter-spacing: 2px;
        }

        .genres-container {
          display: flex;
          justify-content: space-around;
        }

        .genres-container > p {
          font-size: 1rem;
          background-color: ${colors.red};
          color: ${colors.white};
          padding: 10px;
          margin: 0;
          border-radius: 999px;
          margin: 0 5px;
          letter-spacing: 2px;
        }
      `}</style>
    </>
  );
};
