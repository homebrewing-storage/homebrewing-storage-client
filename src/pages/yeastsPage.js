import React, { useContext, useEffect, useReducer, useState } from 'react'
import IngredientList from '../components/ingredientList';
import axios from 'axios';
import { FlashMessage } from '../components/flashMessage';
import Context from '../utils/context';
import * as MessageReducer from '../store/reducers/message_reducer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const YeastsPage = () => {
    const context = useContext(Context)
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const yeasts = 'yeasts';
    const [loading, setloading] = useState(true)

    useEffect(() => {
      let mounted = true
      axios.defaults.withCredentials = true
      axios.get(`http://vps-71bedefd.vps.ovh.net/api/yeasts`, { headers: context.authObj.authHeader()})
      .then(response => {
          if (mounted) {
            context.handleFetchIngredients(response.data.data || response.data)
            setloading(false)
          }
      }).catch(error => {
          if (axios.isCancel(error)) {
          } else {
            return error
          }
      })       
      setloading(true) 
      return function cleanup() {
        mounted = false
      }
    }, [])

    if(loading){
      return loading ? <CircularProgress /> : <div></div>
    }


    return (
        <div>
          <Grid container justify="space-between" alignItems="center">
            <Grid>
              <h1>List of Yeasts</h1>
            </Grid>
            <Grid>  
              <Button variant="outlined" type="submit" component={NavLink} to='/yeast/add'>
                  ADD
              </Button>
            </Grid>
          </Grid>
            
            <IngredientList ingredients={context.ingredientsState} name={yeasts}/>
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}

        </div>
    )
}

export default YeastsPage



