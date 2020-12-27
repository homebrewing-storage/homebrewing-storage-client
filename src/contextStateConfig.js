
import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as AuthReducer from './store/reducers/auth_reducer';
import * as IngredientReducer from './store/reducers/ingredients_reducer';
import Routes from './routes';

import Auth from './utils/auth';


const auth = new Auth()


const ContextState = () => {


    const [stateIngredientReducer, dispatchIngredientReducer] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState)

    const handleFetch = () => {
      dispatchIngredientReducer(ACTIONS.fetch_ingredients())
    }




    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)


    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      dispatchAuthReducer(ACTIONS.login_failure())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }






    return(
      <div>
      
      <Context.Provider
          value={{
            ingredientState: stateIngredientReducer.ingredients,
            useContextFetch: () => handleFetch(),

            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),

            authObj: auth
          }}>
          
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;