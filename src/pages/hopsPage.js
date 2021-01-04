import React, { useContext, useEffect, useReducer} from 'react'
import IngredientList from '../components/ingredientList';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import IngredientForm from '../components/ingredientForm';
import * as ACTIONS from '../store/actions/actions';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import Context from '../utils/context';
import * as MessageReducer from '../store/reducers/message_reducer';

const HopsPage = () => {
    const context = useContext(Context)
    const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const hops = 'hops';
    
    useEffect(() => {
      const fetchData = async () => {
        try{
        const response = await axios.get(`http://localhost/api/hops`, { headers: context.authObj.authHeader() });
        dispatchIngredient(ACTIONS.fetch_ingredients(response.data.data || response.data));
      } catch (error) {
        flashErrorMessage(dispatchMessage, error);
        }    
      };
        fetchData();
        
      }, [dispatchIngredient]);



    return (
        <div>
            <h1>List of Hops</h1>
            
            <IngredientList ingredients={stateIngredient.ingredients} name={hops}/>
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}
        </div>
    )
}
/* <IngredientForm name={hops}></IngredientForm> */
export default HopsPage