import React from "react";
import { AppContext, HideMovieAction } from "./../appProvider/index";
import { colors } from "./../../styles/theme";

export const MovieCard = () => {
  const { state, dispatch } = React.useContext(AppContext);
  if (!state.selectedMovie) return "";
  const movieDate = new Date(state.selectedMovie.releaseDate);
  return (
    <>
      <div className="overlay">
        <article className="modalContainer">
          <button
            className="modalCloseButton"
            onClick={() => dispatch(new HideMovieAction())}
          >
            X
          </button>
          <div className="movieCardContainer">
            <img
              src={state.selectedMovie.poster}
              alt={state.selectedMovie.title}
              className="movieCardImg"
            />
            <div className="movieCardDetailsContainer">
              <p className="movieCardTitle">{state.selectedMovie.title}</p>
              <p className="synopsis">{state.selectedMovie.synopsis}</p>
              <div className="genres-container">
                {state.selectedMovie.genres.map((gender, index) => {
                  const key = `gender-${index}`;
                  return <p key={key}>{gender}</p>;
                })}
              </div>
              <p className="date">{movieDate.toLocaleDateString("en-US")}</p>
            </div>
          </div>
        </article>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          width: 100%;
          height: 100%;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modalContainer {
          max-width: 1000px;
          border-radius: 5px;
          background-color: white;
          padding: 20px;
          background-color: ${colors.primary};
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }

        .modalCloseButton {
          border-radius: 15px;
          padding: 7px 11px;
          border: 0;
          float: right;
          font-weight: bold;
          cursor: pointer;
        }

        .movieCardContainer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          max-height: 100%;
          max-width: 100%;
        }

        .movieCardImg {
          width: 300px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }

        .movieCardDetailsContainer {
          width: 100%;
          margin: 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center
        }

        .movieCardTitle {
          font-size: 1.7rem;
          line-height: 30px;
          font-weight: bold;
          color: ${colors.secondary};
        }

        .synopsis {
          font-size: 1.2rem;
          line-height: 30px;
          color: ${colors.white};
        }

        .date {
          text-align: right;
          color: ${colors.white};
        }

        .genres-container {
          display: flex;
          justify-content: space-around;
          max-width: 350px;
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
