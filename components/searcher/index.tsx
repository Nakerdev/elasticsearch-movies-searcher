import styles from "./searcher.module.css";
import { Children, Component } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { Movie } from "./../../pages/api/movies/movieRepository";
import { AppContext } from "./../appProvider/index";

interface SearcherComponentState {
  movies: Movie[];
}

export class Searcher extends Component<{}, SearcherComponentState> {

  constructor() {
    super({});
    this.state = {
      movies: [],
    };
  }

  async moviesSearchingCriteriaChangedEvent(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const minCriteriaLenghtToFireTheSearch = 3;
    const moviesSearchingCriteria = event.target.value;
    if (moviesSearchingCriteria.length >= minCriteriaLenghtToFireTheSearch) {
      const response = await fetch(
        `/api/movies?criteria=${moviesSearchingCriteria}`
      );
      const jsonResponse = await response.json();
      if (jsonResponse.length === 0) return;
      const movies = jsonResponse.map((movie) =>
        Object.assign(new Movie(), movie)
      );
      this.setState({ movies: movies });
    }
  }

  render() {
    return (
      <section className={styles.container}>
        <form
          className={styles.searcherContainer}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className={styles.searchInput}
            placeholder="The Movie name"
            onChange={(event) =>
              this.moviesSearchingCriteriaChangedEvent(event)
            }
          />
        </form>
        {this.state.movies.length > 0 ? (
          <MoviesList movies={this.state.movies} />
        ) : (
          ""
        )}
      </section>
    );
  }
}

type MoviesListProps = {
  movies: Movie[];
};

const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <div className={styles.moviesSearchingResultContainer}>
      {movies.map((movie, index) => (
        <MovieItem key={index} movie={movie}></MovieItem>
      ))}
    </div>
  );
};

type MovieItemProps = {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  function showMovieCardModal() {
    const modalRoot = document.getElementById("modal-root");
    ReactDOM.render(<MovieCard movie={movie} />, modalRoot);
  }
  return (
    <button
      className={styles.searchingResult}
      onClick={() => showMovieCardModal()}
    >
      {movie.title}
    </button>
  );
};


