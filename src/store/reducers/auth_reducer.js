import * as ACTION_TYPES from '../actions/action_types'

let user = JSON.parse(localStorage.getItem('user'));
export const initialState = {
  is_authenticated: false,
  profile: null,
  user: user ? user : false,
  message: {}
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true,
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false,
        }
        case ACTION_TYPES.REGISTER_SUCCESS:
        return {
          ...state,
          is_authenticated: false,
          message: {
            type: 'success',
            title: 'Success',
            content: 'Verify your email',
        },
        }
        case ACTION_TYPES.ADD_PROFILE:
        return {
          ...state,
          profile: action.payload
        }
      case ACTION_TYPES.REMOVE_PROFILE:
        return {
          ...state,
          profile: null
        }
      default:
        return state
    }
}