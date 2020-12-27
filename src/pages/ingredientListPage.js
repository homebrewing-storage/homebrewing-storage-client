import React, { useContext, useEffect} from 'react'
import IngredientList from '../components/ingredientList';
import { IngredientContext } from '../context/ingredientContext';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';

const IngredientListPage = () => {
    const [state, dispatch] = useContext(IngredientContext);

    
    return (
        <div>
            <h1>List of Ingredients</h1>
            
            <IngredientList ingredients={state.ingredients}/>
            {state.message.content && <FlashMessage message={state.message} />}
        </div>
    )
}

export default IngredientListPage
