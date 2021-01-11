import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  ingredients: [],
  message: {},
  ingredient: [],
  types: []
}

export const IngredientReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_INGREDIENTS:
        return {
          ...state,
          ingredients: action.payload,
        }
      case ACTION_TYPES.FETCH_INGREDIENT:
        return {
          ...state,
          ingredient: action.payload,
        }
      case ACTION_TYPES.CREATE_INGREDIENT:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
          message: {
              type: 'success',
              title: 'Success',
              content: 'Added new ingredient',
          },
      }
      case ACTION_TYPES.DELETE_INGREDIENT:
        const {id, name} = action.payload;
        return {
          ...state,
          ingredients: state.ingredients.filter(item => item.id !== id),
          message: {
            type: 'success',
            title: 'Delete successful',
            content: `Ingredient has been deleted!`,
          }
        }
      case ACTION_TYPES.UPDATE_INGREDIENT:
        const ingredient = action.payload
        return{
          ...state,
          ingredients: state.ingredients.map(item =>
            item.id === ingredient.id ? ingredient : item,  
          ),
          message: {
            type: 'success',
            title: 'Update successful',
            content: `Ingredient has been updated`
          }
        }
      case ACTION_TYPES.INGREDIENT_TYPES:
        return{
          ...state,
          types: action.payload
        }
      default:
        return state
    }
}