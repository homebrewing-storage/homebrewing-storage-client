
import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as AuthReducer from './store/reducers/auth_reducer';
import * as IngredientReducer from './store/reducers/ingredients_reducer';
import * as MessageReducer from './store/reducers/message_reducer';
import Routes from './routes';

import Auth from './utils/auth';


const auth = new Auth()


const ContextState = () => {


    const [stateMessageReducer, dispatchMessageReducer] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState)

    const handleMessage = () => {
      dispatchMessageReducer(ACTIONS.message())
    }




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

    const handleRegister = () => {
      dispatchAuthReducer(ACTIONS.register_success())
    }


    return(
      <div>
      
      <Context.Provider
          value={{
            ingredientState: stateIngredientReducer.ingredients,
            useContextFetch: () => handleFetch(),

            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            userState: stateAuthReducer.user,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserRegister: () => handleRegister(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),

            messageState: stateMessageReducer.message,
            handleUserMessage: () => handleMessage(),

            authObj: auth
          }}>
          
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;