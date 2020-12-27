import React, { useReducer, createContext } from 'react';

export const IngredientContext = createContext();


const initialState = {
    ingredients: [],
    ingredient: [],
    message: '',
}

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_INGREDIENTS': {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        case 'FETCH_INGREDIENT': {
            return {
                ...state,
                ingredient: action.payload
            }
        }
        case 'FLASH_MESSAGE': {
            return {
                ...state,
                message: action.payload
            }
        }
        case 'CREATE_INGREDIENT': {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                message: {
                    type: 'success',
                    title: 'Success',
                    content: 'Added new ingredient',
                },
            }
        }
        case 'UPDATE_INGREDIENT': {
            const ingredient = action.payload
            return {
                ...state,
                ingredients: state.ingredients.map(item => 
                    item.id === ingredient.id ? ingredient : item,
                ),
                message: {
                    type: 'success',
                    title: 'Update successful',
                    content: `Ingredient "${ingredient.name}" has been updated!`,
                }
            }
        }
        case 'DELETE_INGREDIENT': {
            const {id, name} = action.payload;
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.id !== id),
                message: {
                    type: 'success',
                    title: 'Delete successful',
                    content: `Ingredient "${name}" has been deleted!`,
                }
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