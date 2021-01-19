import React, { useContext, useEffect, useReducer, useState } from 'react'
import IngredientList from '../components/ingredientList';
import axios from 'axios';
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import Context from '../utils/context';
import * as MessageReducer from '../store/reducers/message_reducer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const ExtrasPage = () => {
    const context = useContext(Context)
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const [loading, setloading] = useState(true)
    const extras = 'extras';

    useEffect(() => {
        handleFetch();
      }, []);


    const handleFetch = () => {
      async function fetch() {
        try {
            const response = await axios.get(`http://vps-71bedefd.vps.ovh.net/api/extras`, { headers: context.authObj.authHeader() })
            context.handleFetchIngredients(response.data.data || response.data)
            setloading(false)
        } catch (error) {
          flashErrorMessage(dispatchMessage, error)
        }
      }
      fetch()
      setloading(true)
    }

    if(loading){
      return loading ? <CircularProgress /> : <div></div>
    }

    return (
        <div>
          <Grid container justify="space-between" alignItems="center">
            <Grid>
              <h1>List of extras</h1>
            </Grid>
            <Grid>  
              <Button variant="outlined" type="submit" component={NavLink} to='/extra/add'>
                  ADD
              </Button>
            </Grid>
          </Grid>
            
            <IngredientList ingredients={context.ingredientsState} name={extras}/>
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}

        </div>
    )
}

export default ExtrasPage



