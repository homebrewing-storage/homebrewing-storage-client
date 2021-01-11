import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  message: {},
}

export const MessageReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.ERROR:
        return {
          ...state,
          message: action.payload,
        }
        case ACTION_TYPES.SUCCESS:
        return {
          ...state,
          message: action.payload,
        }
 
      default:
        return state
    }
}
