import * as ACTION_TYPES from './action_types'

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}

export const message = (err) => {
  return {
    type: ACTION_TYPES.MESSAGE,
    payload: {
      type: 'error',
      title: err.title,
      content: err.message
    }
  }
}

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  }
}

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}

export const register_success = () => {
  return {
    type: ACTION_TYPES.REGISTER_SUCCESS,
  }
}

export const add_profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

export const fetch_ingredients = (ingredients) => {
  return {
      type: ACTION_TYPES.FETCH_INGREDIENTS,
      payload: ingredients
  }  
}