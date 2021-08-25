import styles from "./movieCard.module.css";
import React from "react";
import { AppContext } from "./../appProvider/index";

export class MovieCard extends React.Component {
  render() {
    const { state, dispatch } = React.useContext(AppContext);
    if (!state.selectedMovie) return "";
    return (
      <div className={styles.overlay}>
        <article className={styles.modalContainer}>
          <button className={styles.modalCloseButton}>X</button>
          <div className={styles.movieCardContainer}>
            <img
              src={state.selectedMovie.poster}
              alt={state.selectedMovie.title}
              className={styles.movieCardImg}
            />
            <div className={styles.movieCardDetailsContainer}>
              <p className={styles.movieCardTitle}>
                {state.selectedMovie.title}
              </p>
              <p>{state.selectedMovie.synopsis}</p>
              <p>{state.selectedMovie.releaseDate}</p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
