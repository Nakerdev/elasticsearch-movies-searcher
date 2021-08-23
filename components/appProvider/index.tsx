import React from "react";
import { AppProps } from "next/app";

interface State {
    movieModal: MovieModalState; 
}

class MovieModalSatate {
    public isShown: bool;

    constructor(isShown: bool){
        this.isShown = isShown;
    }
}

const initialState: State = {
    movieModal: new MovieModalSatate(false)
}

interface Action {
    type: string;
}

function reducer(state: State, action: Action): State {
    switch(action.type){
        case "show_movie":
            return {
                ...state,
                movieModal: new MovieModalSatate(true)
            }
        default:
            return state;
    }
}

export const AppContext = React.createContext({
    state: initialState,
    dispatch: () => null
});

export const AppProvider = ({children}: AppProps ) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[ state, dispatch ]}>
            { children }
        </AppContext.Provider>
    );
}
