import React, { useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import IngredientCard from '../components/ingredientCard';
import Context from '../utils/context';
import * as MessageReducer from '../store/reducers/message_reducer';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';

const IngredientPage = () => {
    const context = useContext(Context);
    const [loading, setLoading] = useState(true);
    const id = useParams().id;
    const name = useParams().name;
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    
    useEffect(() => {
        
        
        if (id) {
            const fetchData = async () => {
                try{
                    await axios.get(`http://localhost/api/${name}/${id}`, { headers: context.authObj.authHeader() })
                    .then(res => {
                        context.handleFetchIngredient(res.data || res.data.data)
                        
                        setLoading(false);
                        console.log(res)
                    }) 

                } catch(error) {
                    flashErrorMessage(dispatchMessage, error);
                }
            }
            fetchData();
            
        } else {
            setLoading(false)
        }
        
    }, []);
    console.log(context.ingredientState)
    

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <div>
            <h1>Ingredient page</h1>
            <IngredientCard ingredient={context.ingredientState}/>
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}
        </div>
    )
}

export default IngredientPage
