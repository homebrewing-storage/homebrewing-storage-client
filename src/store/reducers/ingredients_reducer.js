import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  ingredients: [],
}

export const IngredientReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_INGREDIENTS:
        return {
          ...state,
          ingredients: action.payload,
        }
      
      default:
        return state
    }
}