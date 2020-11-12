import React, { useReducer, createContext } from 'react';

export const IngredientContext = createContext();


const initialState = {
    ingredients: [],
}

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_INGREDIENTS': {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        default:
            throw new Error();
    }
}

export const IngredientContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { children } = props;

    return (
        <IngredientContext.Provider value={[state, dispatch]}>
            {children}
        </IngredientContext.Provider>
    )
}