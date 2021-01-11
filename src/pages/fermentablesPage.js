import React, { useContext, useEffect, useReducer, useRef} from 'react'
import IngredientList from '../components/ingredientList';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import IngredientForm from '../components/ingredientForm';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import Context from '../utils/context';
import * as MessageReducer from '../store/reducers/message_reducer';

const FermentablesPage = () => {
    const context = useContext(Context)
    const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const fermentables = 'fermentables';
    let isRendered = useRef(false);
    
    useEffect(() => {
      isRendered = true;
  
      axios.get(`http://localhost/api/fermentables`, { headers: context.authObj.authHeader() }).then(res => {
          if (isRendered) {
            context.handleFetchIngredients(res.data.data || res.data);
            console.log(res)
            
          }
          return null;
        }).catch(error => {flashErrorMessage(dispatchMessage, error)})
  
        return () => {
          isRendered = false;
       };
      
      }, []);


    return (
        <div>
            <h1>List of Fermentables</h1>
            
            <IngredientList ingredients={context.ingredientsState} name={fermentables}/>
            <IngredientForm name={fermentables}></IngredientForm>
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}
        </div>
    )
}

export default FermentablesPage