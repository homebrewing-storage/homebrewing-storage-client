import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  logs: [],
}

export const LogsReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_LOGS:
        return {
          ...state,
          logs: action.payload,
        }
      default:
        return state
    }
}
