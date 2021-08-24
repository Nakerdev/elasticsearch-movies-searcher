import styles from "./movieCard.module.css";
import React from "react";
import { AppContext } from "./../appProvider/index";

export const MovieCard = () => {
  //const [state, dispatch] = React.useContext(AppContext);
  //if(state.movieModal.isShown){
return (
  <article className={styles.movieCardContainer}>
    <img 
        src="https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg" 
        alt=""
        className={styles.movieCardImg}
    />
    <div className={styles.movieCardDetailsContainer}>
        <p className={styles.movieCardTitle}>HARRY POTTER AND THE PHILOSOPHERS STONE</p>
        <p>Sinpsis</p>
        <p>10/10/1990</p>
    </div>
  </article>
);
};
