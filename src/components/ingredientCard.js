import React, {  useContext, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useForm, Controller} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Context from '../utils/context';
import axios from 'axios';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import { FlashMessage } from './flashMessage';
import { useParams } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      width: "100%"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    form: {
      padding: theme.spacing(2)
    },
    formControl: {
      minWidth: 200,
      width: '100%'
    },
    input: {
      width: '100%',
    }
}));

const IngredientCard = ({ingredient}) => {
  const context = useContext(Context);
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
  const id = useParams().id;
  const name = useParams().name;


  const editIngredient = async data => {
      await axios.put(`http://vps-71bedefd.vps.ovh.net/api/${name}/${id}`, data, { headers: context.authObj.authHeader() })
      .then(response => {
        context.handleUpdateIngredient(response.data)

      }).catch(error => {
        dispatchIngredient({
          type: "MESSAGE",
          payload: {
            type: 'error',
            content: error.response.data.name || error.response.data.amount || error.response.data.expiration_date || error.response.data.type_id
          }
        })
      })
        
  }
  
  const onSubmit = async data => {
    await editIngredient(data);
  }

  const Type = () => {
    return (
      <Grid item className={classes.form} xs={4}>
        <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="type_id">Type</InputLabel>
                  <Controller
                    control={control}
                    name="type_id"
                    as={
                      <Select id="type_id" >
                        {context.typesState.map(item => {
                            return(
                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            )
                          })}
                      </Select>
                    }
                    defaultValue={ingredient.type.id}
                    />
                </FormControl>
        </Grid>
    )
  }

  const Acid = () => {
    return (
      <Grid item className={classes.form} xs={4}>
              <Controller as={
                <TextField 
                id="alpha_acid"
                label="Alpha acid"
                className={classes.input}
                />
              } name="alpha_acid" control={control} defaultValue={ingredient.alpha_acid} />
    </Grid>
    )
  }

  return (
    <Grid container item xs={12} >
    <Card className={classes.root}>
    <form onSubmit={handleSubmit(onSubmit)} >
      <CardContent>
        
        <Grid item className={classes.form} xs={4}>
          <Controller as={
            <TextField 
              id="Name"
              label="Name"
              className={classes.input}
              />
          } name="name" control={control} defaultValue={ingredient.name} />
        </Grid>
        {name==="hops" ? Acid() : Type()}
        <Grid item className={classes.form} xs={4}>
          <Controller as={
            <TextField 
              id="Amount"
              label="Amount"
              className={classes.input}
              />
              } name="amount" control={control} defaultValue={ingredient.amount} />
        </Grid>
        <Grid item className={classes.form} xs={4}>
          <Controller as={
            <TextField 
              id="Date"
              type="date"
              className={classes.input}
              />
              } name="expiration_date" control={control} defaultValue={ingredient.expiration_date} />
        </Grid>
        
      </CardContent>
      <Grid container direction="row">
          <Grid item>
            <CardActions>
                <Button size="small" variant="outlined" color="primary" type="submit">Save</Button>
            </CardActions>
          </Grid>
        <Grid item>
            <CardActions>
                <Button size="small" variant="outlined" color="secondary">Delete</Button>
            </CardActions>
        </Grid>
      </Grid>
      </form>
    </Card>
    {stateIngredient.message.content && <FlashMessage message={stateIngredient.message} />}
    </Grid>
  );
}

export default IngredientCard;