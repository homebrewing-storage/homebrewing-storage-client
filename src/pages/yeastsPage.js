import React, { useContext, useEffect, useReducer, useRef} from 'react'
import IngredientList from '../components/ingredientList';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import IngredientForm from '../components/ingredientForm';
import Context from '../utils/context';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import * as MessageReducer from '../store/reducers/message_reducer';


const YeastsPage = () => {
    const context = useContext(Context)
    const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);

    const yeasts = 'yeasts';
    let isRendered = useRef(false);

    useEffect(() => {
      isRendered = true;
  
      axios.get(`http://localhost/api/yeasts`, { headers: context.authObj.authHeader() }).then(res => {
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
            <h1>List of Yeasts</h1>
            <IngredientList ingredients={context.ingredientsState} name={yeasts}/>
            <IngredientForm name={yeasts}></IngredientForm> 
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}

        </div>
    )
}

export default YeastsPage



