import React, { useContext, useEffect, useReducer} from 'react'
import IngredientList from '../components/ingredientList';
import { IngredientContext } from '../context/ingredientContext';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import IngredientForm from '../components/ingredientForm';
import * as ACTIONS from '../store/actions/actions';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import Context from '../utils/context';

const ExtrasPage = () => {
    const context = useContext(Context)
    const [state, dispatch] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const extras = 'extras';
    
    useEffect(() => {
      const fetchData = async () => {
        try{
        const response = await axios.get(`http://localhost/api/fermentables`);
        dispatch(ACTIONS.fetch_ingredients(response.data.data || response.data));
      } catch (error) {
        flashErrorMessage(dispatch, error);
        }    
      };
        fetchData();
        
      }, [dispatch]);


    return (
        <div>
            <h1>List of Extras</h1>
            
            <IngredientList ingredients={state.ingredients} name={extras}/>
            
        </div>
    )
}
/* <IngredientForm name={extras}></IngredientForm> */
export default ExtrasPage