
import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as AuthReducer from './store/reducers/auth_reducer';
import * as IngredientReducer from './store/reducers/ingredients_reducer';
import * as MessageReducer from './store/reducers/message_reducer';
import * as NotificationsReducer from './store/reducers/notifications_reducer';
import * as LogsReducer from './store/reducers/logs_reducer';
import Routes from './routes';

import Auth from './utils/auth';


const auth = new Auth()


const ContextState = () => {


    const [stateMessageReducer, dispatchMessageReducer] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState)

    const handleMessage = () => {
      dispatchMessageReducer(ACTIONS.messageError())
    }

    const [stateNotificationsReducer, dispatchNotificationsReducer] = useReducer(NotificationsReducer.NotificationsReducer, NotificationsReducer.initialState);
    
    const fetchNotifications = (notifications) => {
      dispatchNotificationsReducer(ACTIONS.fetch_notifications(notifications))
    }

    const [stateLogsReducer, dispatchLogsReducer] = useReducer(LogsReducer.LogsReducer, LogsReducer.initialState);

    const fetchLogs = (logs) => {
      dispatchLogsReducer(ACTIONS.fetch_logs(logs))
    }

    const [stateIngredientReducer, dispatchIngredientReducer] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState)

    const fetchIngredients = (ingredients) => {
      dispatchIngredientReducer(ACTIONS.fetch_ingredients(ingredients))
    }

    const fetchIngredient = (ingredient) => {
      dispatchIngredientReducer(ACTIONS.fetch_ingredient(ingredient))
    }

    const fetchTypes = (types) => {
      dispatchIngredientReducer(ACTIONS.ingredient_types(types))
    }

    const deleteIngredient = (ingredient) => {
      dispatchIngredientReducer(ACTIONS.delete_ingredient(ingredient));
    }

    const createIngredient = (ingredient) => {
      dispatchIngredientReducer(ACTIONS.create_ingredient(ingredient))
    }

    const updateIngredient = (ingredient) => {
      dispatchIngredientReducer(ACTIONS.update_ingredient(ingredient))
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
            ingredientsState: stateIngredientReducer.ingredients,
            ingredientState: stateIngredientReducer.ingredient,
            ingredientmessageState: stateIngredientReducer.message,
            typesState: stateIngredientReducer.types,
            handleFetchIngredients: (ingredients) => fetchIngredients(ingredients),
            handleFetchIngredient: (ingredient) => fetchIngredient(ingredient),
            handleDeleteIngredient: (ingredient) => deleteIngredient(ingredient),
            handleFetchTypes: (types) => fetchTypes(types),
            handleCreateIngredient: (ingredient) => createIngredient(ingredient),
            handleUpdateIngredient: (ingredient) => updateIngredient(ingredient),

            notificationsState: stateNotificationsReducer.notifications,
            handleFetchNotifications: (notifications) => fetchNotifications(notifications),

            logsState: stateLogsReducer.logs,
            handleFetchLogs: (logs) => fetchLogs(logs),

            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            userState: stateAuthReducer.user,
            authMessageState: stateMessageReducer.message,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserRegister: () => handleRegister(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),

            messageState: stateMessageReducer.message,
            handleUserMessage: () => handleMessage(),

            authObj: auth,
          }}>
          
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;