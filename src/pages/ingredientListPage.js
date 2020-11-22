import React, { useContext, useEffect} from 'react'
import IngredientList from '../components/ingredientList';
import { IngredientContext } from '../context/ingredientContext';

const data = [
    {
        id: '1',
        name: 'hop'
    },
    {
        id: '2',
        name: 'malt'
    },
  ];

const IngredientListPage = () => {
    const [state, dispatch] = useContext(IngredientContext);

    useEffect(() => {
        dispatch({
          type: 'FETCH_INGREDIENTS',
          payload: data,
        });
      }, [dispatch]);

    return (
        <div>
            <h1>List of Ingredients</h1>
            <IngredientList ingredients={state.ingredients}/>
        </div>
    )
}

export default IngredientListPage
