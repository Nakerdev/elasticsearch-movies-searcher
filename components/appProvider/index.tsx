import React from "react";
import { AppProps } from "next/app";
import { Movie } from "./../../pages/api/movies/movieRepository";

interface State {
  selectedMovie?: Movie;
  foundMovies: Movie[];
}

const initialState: State = {
  selectedMovie: undefined,
  foundMovies: [],
};

enum ActionType {
  showMovie = 1,
  hideMovie = 2,
  searchMovies = 3,
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

export class SearchMoviesAction implements Action {
  readonly type: ActionType;
  readonly criteria: string;
  readonly foundMovies: Movie[];

  constructor(criteria: string, foundMovies: Movie[]) {
    this.type = ActionType.searchMovies;
    this.criteria = criteria;
    this.foundMovies = foundMovies;
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
    case ActionType.searchMovies: {
      const searchMoviesAction = action as SearchMoviesAction;
      return {
        ...state,
        foundMovies: searchMoviesAction.foundMovies,
      };
    }
    default:
      return state;
  }
}

async function middelwares(action: Action): Promise<Action> {
  switch (action.type) {
    case ActionType.searchMovies: {
      const showMovieAction = action as SearchMoviesAction;
      const foundMovies = await searchMovies(showMovieAction.criteria);
      return new SearchMoviesAction(showMovieAction.criteria, foundMovies);
    }
    default:
      return action;
  }

  async function searchMovies(criteria: string) {
    const minCriteriaLenghtToFireTheSearch = 3;
    if (criteria.length < minCriteriaLenghtToFireTheSearch) return [];
    const response = await fetch(`/api/movies?criteria=${criteria}`);
    const movies: Movie[] = await response.json();
    return movies;
  }
}

const useReducerWithMiddleware = (
  reducer: React.Reducer<State, Action>,
  initialState: State,
  middlewareFn: (action: Action) => Promise<Action>
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchWithMiddleware = async (action: Action) => {
    var newAction = await middlewareFn(action);
    dispatch(newAction);
  };
  return [state, dispatchWithMiddleware];
};

export const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    middelwares
  );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
