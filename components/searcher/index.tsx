import React from "react";
import { colors } from "./../../styles/theme";
import { Movie } from "./../../pages/api/movies/movieRepository";
import {
  AppContext,
  ShowMovieAction,
  SearchMoviesAction,
} from "./../appProvider/index";

export const Searcher = () => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <>
      <section>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="The Movie name"
            onChange={(event) =>
              dispatch(new SearchMoviesAction(event.target.value, []))
            }
          />
        </form>
        <MoviesList />
      </section>
      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background-color: ${colors.primary};
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
        }
      `}</style>
    </>
  );
};

const MoviesList = () => {
  const { state, dispatch } = React.useContext(AppContext);
  if (state.foundMovies.length == 0) return "";
  return (
    <>
      <div>
        {state.foundMovies.map((movie, index) => (
          <MovieItem key={index} movie={movie}></MovieItem>
        ))}
      </div>
      <style jsx>{`
        div {
          margin-top: 20px;
          width: 90%;
          display: flex;
          flex-direction: column;
          background-color: ${colors.primary};
        }
      `}</style>
    </>
  );
};

type MovieItemProps = {
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
          background-color: ${colors.red};
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
          background-color: ${colors.secondary};
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
