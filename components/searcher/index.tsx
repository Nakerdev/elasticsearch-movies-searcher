import React from "react";
import { Movie } from "./../../pages/api/movies/movieRepository";
import {
  AppContext,
  ShowMovieAction,
  SearchMoviesAction,
} from "./../appProvider/index";

export const Searcher = () => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
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
  );
};

const MoviesList = () => {
  const { state, dispatch } = React.useContext(AppContext);
  if (state.foundMovies.length == 0) return "";
  return (
    <div className="moviesSearchingResultContainer">
      {state.foundMovies.map((movie, index) => (
        <MovieItem key={index} movie={movie}></MovieItem>
      ))}
    </div>
  );
};

type MovieItemProps = {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <button
      className="searchingResult"
      onClick={() => dispatch(new ShowMovieAction(movie))}
    >
      {movie.title}
    </button>
  );
};
