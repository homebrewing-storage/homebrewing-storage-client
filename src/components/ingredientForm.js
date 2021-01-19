import React, { useContext, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Context from '../utils/context';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  formControl: {
    minWidth: 200,
  },
});



const IngredientForm = ({createName}) => {
    const classes = useStyles();
    const context = useContext(Context);
    const { control, handleSubmit, register } = useForm();
    const nameIngredient = useParams().name;
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
      nameIngredient === "hop" ? setLoading(false) :
      axios.get(`http://vps-71bedefd.vps.ovh.net/api/${nameIngredient}-type`, { headers: context.authObj.authHeader() })
      .then(res => {
        context.handleFetchTypes(res.data)
        setLoading(false);
      })
      
    }, [setLoading])

    const createIngredient = async data => {
      axios.defaults.withCredentials = true
      try {
        const response = await axios.post(`http://vps-71bedefd.vps.ovh.net/api/${nameIngredient}s`, data, { headers: context.authObj.authHeader() });
        context.handleCreateIngredient(response.data)

      } catch (error) {
        return error
      }
    };


    const onSubmit = async data => {
      await createIngredient(data);
    };

    if (loading) {
      return <p>Please wait...</p>
    }

    const Type = () => {
      return (  
        <Grid item xs={12} lg={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="type_id">Type</InputLabel>
                  <Controller
                    control={control}
                    name="type_id"
                    defaultValue=''
                    as={
                      <Select id="type_id">
                        {context.typesState.map(item => {
                              return(
                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                              )
                          })}
                      </Select>
                    }
                    />
                </FormControl>
              </Grid>
      )
    }

    const Acid = () => {
      return (
        <Grid item xs={12} lg={3}>
                <Controller as={
                  <TextField 
                  id="alpha_acid"
                  label="Alpha acid"
                  />
                } name="alpha_acid" control={control} defaultValue="" />
      </Grid>
      )
    }

    return (
        
            
            <form onSubmit={handleSubmit(onSubmit)} >
              <Box mt={3}>
              <Grid container spacing={2} alignItems="flex-end">

                <Grid item xs={12} lg={3}>
                <TextField 
                  id="Name"
                  label="Name"
                  name="name"
                  inputRef={register({ required: true })}
                  />
                </Grid>
                {nameIngredient==="hop" ? Acid() : Type()}

                <Grid item xs={12} lg={3}>
                <Controller as={
                  <TextField 
                  id="Amount"
                  label="Amount"
                  />
                } name="amount" control={control} defaultValue="" />
                </Grid>
                
                <Grid item xs={12} lg={3}> 
                <Controller as={
                  <TextField 
                  id="exp_date"
                  type="date"
                  />
                } name="expiration_date" control={control} defaultValue="" />
                </Grid>

                <Grid item xs={12} lg={2}>
                  <Button variant="outlined" type="submit">
                    ADD
                  </Button>
                </Grid>
                
                </Grid>
                </Box>
                
              </form> 
                                                     
    )
}

export default IngredientForm
