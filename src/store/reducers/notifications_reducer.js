import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  notifications: [],
}

export const NotificationsReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
        }
      default:
        return state
    }
}
