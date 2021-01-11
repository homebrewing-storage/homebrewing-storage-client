import React, { useContext, useState, useReducer, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm, Controller} from 'react-hook-form';
import { flashErrorMessage, FlashMessage } from './flashMessage';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import * as ACTIONS from '../store/actions/actions';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import * as MessageReducer from '../store/reducers/message_reducer';
import Context from '../utils/context';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    minWidth: 200,
  },
});


const IngredientForm = ({name}) => {
    const classes = useStyles();
    const context = useContext(Context);
    const { control, handleSubmit, register } = useForm();
    const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [inputName, setInputName] = useState('');
    

    useEffect(() => {
      axios.get('http://localhost/api/yeast-type', { headers: context.authObj.authHeader() })
      .then(res => {
        dispatchIngredient(ACTIONS.ingredient_types(res.data))
        setTypes(res.data)
      })
      
    }, [])

    const createIngredient = async data => {
      console.log(data)
      try {
        const response = await axios.post(`http://localhost/api/${name}`, data, { headers: context.authObj.authHeader() });
        dispatchIngredient(ACTIONS.create_ingredient(response.data))

      } catch (error) {
        flashErrorMessage(dispatchMessage, error);
      }
    };


    const onSubmit = async data => {
      await createIngredient(data);
    };



    return (
        
            
            <form onSubmit={handleSubmit(onSubmit)} >
              <Box mt={3}>
              <Grid container spacing={2} alignItems="flex-end">

                <Grid item xs={2}>
                <TextField 
                  id="Name"
                  label="Name"
                  name="name"
                  inputRef={register({ required: true })} 
                  />
                </Grid>

                <Grid item xs={2}>
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
                {stateIngredient.message.content && <FlashMessage message={stateIngredient.message} />}
              </form> 
                                                     
    )
}

export default IngredientForm
