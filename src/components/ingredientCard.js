import React, { useState, useContext, useReducer, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useForm, Controller} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Context from '../utils/context';
import axios from 'axios';
import * as ACTIONS from '../store/actions/actions';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import * as MessageReducer from '../store/reducers/message_reducer';
import { flashErrorMessage, FlashMessage } from './flashMessage';
import { useLocation, useParams } from 'react-router';
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
    },
}));

const IngredientCard = ({ingredient}) => {
  const context = useContext(Context);
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [ type, setType ] = useState('');
  const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
  const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
  const location = useLocation();
  const [types, setTypes] = useState([]);
  const id = useParams().id;
  const name = useParams().name;


  useEffect(() => {
    axios.get('http://localhost/api/yeast-type', { headers: context.authObj.authHeader() })
      .then(res => {
        setTypes(res.data)
      })
  }, [])

  const editIngredient = async data => {
    console.log(data)
      try {
        const response = await axios.put(`http://localhost/api/${name}/${id}`, data, { headers: context.authObj.authHeader() });
        dispatchIngredient(ACTIONS.update_ingredient(response.data))
        console.log(response)
        
      } catch (error) {
        flashErrorMessage(dispatchMessage, error);
      }
  }

  const onSubmit = async data => {
    await editIngredient(data);
  }

  return (
    <Grid container item xs={12} >
    <Card className={classes.root}>
    <form onSubmit={handleSubmit(onSubmit)} >
      <CardContent>
        
        <Grid item className={classes.form}>
          <Controller as={
            <TextField 
              id="Name"
              label="Name"

              />
          } name="name" control={control} defaultValue={ingredient.name} />
        </Grid>
        <Grid item className={classes.form}>
        <FormControl className={classes.formControl}>
                  <InputLabel id="type_id">Type</InputLabel>
                  <Controller
                    control={control}
                    name="type_id"
                    as={
                      <Select labelId="type_id">
                        {types.map(item => {
                            return(
                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            )
                          })}
                      </Select>
                    }
                    />
                </FormControl>
        </Grid>
        <Grid item className={classes.form}>
          <Controller as={
            <TextField 
              id="Amount"
              label="Amount"
              
              />
              } name="amount" control={control} defaultValue={ingredient.amount} />
        </Grid>
        <Grid item className={classes.form}>
          <Controller as={
            <TextField 
              id="Date"
              type="date"

              />
              } name="expiration_date" control={control} defaultValue='' />
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
    </Grid>
  );
}

export default IngredientCard;