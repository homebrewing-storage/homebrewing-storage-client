import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { flashErrorMessage } from '../components/flashMessage';
import { IngredientContext } from '../context/ingredientContext';
import { useParams } from "react-router-dom";

const IngredientPage = () => {
    const [state, dispatch] = useContext(IngredientContext);
    const [loading, setLoading] = useState(true);
    const id = useParams()._id;
    const name = useParams().name;

    useEffect(() => {
           
        if (id) {
            const fetchData = async () => {
                try{
                    const response = await axios.get(`http://localhost/api/${name}/${id}`);
                    dispatch({
                        type: 'FETCH_INGREDIENT',
                        payload: response.data,
                    });
                    setLoading(false);
                    console.log(response)
                } catch(error) {
                    flashErrorMessage(dispatch, error);
                }
            }
            fetchData();
        } else {
            setLoading(false)
        }
    }, [dispatch]);

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <div>
            <h1>Ingredient page</h1>
            
        </div>
    )
}

export default IngredientPage
