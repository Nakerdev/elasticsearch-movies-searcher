import React from "react";
import { AppProps } from "next/app";
import { Movie } from "./../../pages/api/movies/movieRepository";

interface State {
  selectedMovie?: Movie;
}

const initialState: State = {
  selectedMovie: new Movie(
    "287947",
    "Shazam!",
    "https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg",
    "A boy is given the ability to become an adult superhero in times of need with a single magic word.",
    1290193,
    ["Action", "Comedy", "Fantasy"]
  ),
};

enum ActionType {
  showMovie = 1,
  hideMovie = 2,
}

interface Action {
  type: ActionType;
}

export class ShowMovieAction implements Action {
  readonly type: ActionType;
  readonly selectedMovie: Movie;

  constructor(selectedMovie: Movie) {
    this.type = ActionType.showMovie;
    this.selectedMovie = selectedMovie;
  }
}

export class HideMovieAction implements Action {
  readonly type: ActionType;

  constructor() {
    this.type = ActionType.hideMovie;
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.showMovie: {
      const showMovieAction = action as ShowMovieAction;
      return {
        ...state,
        selectedMovie: showMovieAction.selectedMovie,
      };
    }
    case ActionType.hideMovie: {
      return {
        ...state,
        selectedMovie: undefined,
      };
    }
    default:
      return state;
  }
}

export const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
