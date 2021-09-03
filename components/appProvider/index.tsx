import React, {useReducer} from "react";
import { Movie } from "./../../pages/api/movies/movieRepository";

interface State {
  selectedMovie?: Movie;
}

const initialState: State = {
  selectedMovie: undefined,
};

enum ActionType {
  showMovie = 1,
  hideMovie = 2
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
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
