import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm, Controller} from 'react-hook-form';
import { IngredientContext } from '../context/ingredientContext';
import { Redirect } from 'react-router-dom';
import { flashErrorMessage, FlashMessage } from './flashMessage';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { useParams } from "react-router-dom";




const IngredientForm = ({name}) => {
    const [state, dispatch] = useContext(IngredientContext);
    const { control, handleSubmit } = useForm();
    const [redirect, setRedirect] = useState(false);

    const createIngredient = async data => {
      try {
        const response = await axios.post(`http://localhost/api/${name}`, data);
        dispatch({
          type: 'CREATE_INGREDIENT',
          payload: response.data,
        });
        setRedirect(true);
        
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };


    const onSubmit = async data => {
      console.log(data)
      await createIngredient(data);
    };


    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
        
          
            <form onSubmit={handleSubmit(onSubmit)} >

              <Box mt={3}>
              <Grid container spacing={2} alignItems="flex-end">

                <Grid item xs={2}>
                <Controller as={
                  <TextField 
                  id="Name"
                  label="Name"
                  />
                } name="name" control={control} defaultValue="" />
                </Grid>
                
                <Grid item xs={2}>
                <Controller as={
                  <TextField 
                  id="Type"
                  label="Type"
                  />
                } name="type" control={control} defaultValue="" />
                </Grid>

                <Grid item xs={2}>
                <Controller as={
                  <TextField 
                  id="Amount"
                  label="Amount"
                  />
                } name="amount" control={control} defaultValue="" />
                </Grid>
                
                <Grid item xs={3}> 
                <Controller as={
                  <TextField 
                  id="exp_date"
                  type="date"
                  />
                } name="expiration_date" control={control} defaultValue="" />
                </Grid>

                <Grid item xs={2}>
                  <Button variant="outlined" primary type="submit">
                    ADD
                  </Button>
                </Grid>
                
                </Grid>
                </Box>
                {state.message.content && <FlashMessage message={state.message} />}
              </form> 
                                                     
    )
}

export default IngredientForm
