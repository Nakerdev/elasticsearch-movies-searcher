import styles from "./movieCard.module.css";
import React from "react";
import { AppContext, HideMovieAction } from "./../appProvider/index";

export const MovieCard = () => {
  const { state, dispatch } = React.useContext(AppContext);
  if (!state.selectedMovie) return "";
  return (
    <div className={styles.overlay}>
      <article className={styles.modalContainer}>
        <button
          className={styles.modalCloseButton}
          onClick={() => dispatch(new HideMovieAction())}
        >
          X
        </button>
        <div className={styles.movieCardContainer}>
          <img
            src={state.selectedMovie.poster}
            alt={state.selectedMovie.title}
            className={styles.movieCardImg}
          />
          <div className={styles.movieCardDetailsContainer}>
            <p className={styles.movieCardTitle}>{state.selectedMovie.title}</p>
            <p>{state.selectedMovie.synopsis}</p>
            <p>{state.selectedMovie.releaseDate}</p>
            {state.selectedMovie.genres.map((gender, index) => {
              const key = `gender-${index}`;
              return <p key={key}>{gender}</p>;
            })}
          </div>
        </div>
      </article>
    </div>
  );
};
