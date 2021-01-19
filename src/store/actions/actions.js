import * as ACTION_TYPES from './action_types'

export const messageError = (err) => {
  return {
    type: ACTION_TYPES.ERROR,
    payload: {
      type: 'error',
      title: err.title,
      content: err.message
    }
  }
}

export const messageSuccess = (text) => {
  return {
    type: ACTION_TYPES.SUCCESS,
    payload: {
      type: 'success',
      title: text,
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

export const fetch_ingredient = (ingredient) => {
  return {
      type: ACTION_TYPES.FETCH_INGREDIENT,
      payload: ingredient
  }  
}

export const delete_ingredient = (ingredient) => {
  return {
      type: ACTION_TYPES.DELETE_INGREDIENT,
      payload: ingredient
  }  
}

export const create_ingredient = (ingredients) => {
  return {
      type: ACTION_TYPES.CREATE_INGREDIENT,
      payload: ingredients
  }
}

export const update_ingredient = (ingredient) => {
  return {
    type: ACTION_TYPES.UPDATE_INGREDIENT,
    payload: ingredient
  }
}

export const ingredient_types = (types) => {
  return {
    type: ACTION_TYPES.INGREDIENT_TYPES,
    payload: types
  }
}

export const fetch_notifications = (notifications) => {
  return {
    type: ACTION_TYPES.FETCH_NOTIFICATIONS,
    payload: notifications
  }
}

export const fetch_logs = (logs) => {
  return {
    type: ACTION_TYPES.FETCH_LOGS,
    payload: logs
  }
}