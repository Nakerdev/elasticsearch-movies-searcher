import React from "react";
import { AppContext, HideMovieAction } from "./../appProvider/index";

export const MovieCard = () => {
  const { state, dispatch } = React.useContext(AppContext);
  if (!state.selectedMovie) return "";
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
      <style jsx>{`
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modalContainer {
          width: 50%;
          border: solid 1px white;
          border-radius: 5px;
          background-color: white;
          padding: 20px;
        }

        .modalCloseButton {
          border-radius: 15px;
          padding: 7px 11px;
          border: 0;
          float: right;
          font-weight: bold;
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
        }

        .movieCardDetailsContainer {
          width: 100%;
          margin: 0 20px;
        }

        .movieCardTitle {
          font-size: 1.5rem;
          line-height: 30px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
