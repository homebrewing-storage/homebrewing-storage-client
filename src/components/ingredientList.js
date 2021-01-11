import React, { useContext, useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { NavLink, Route } from 'react-router-dom';
import { flashErrorMessage, flashSuccessMessage, FlashMessage }  from  './flashMessage';
import axios  from  'axios';
import * as ACTIONS from '../store/actions/actions';
import * as IngredientReducer from '../store/reducers/ingredients_reducer';
import * as MessageReducer from '../store/reducers/message_reducer';
import Context from '../utils/context';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const IngredientList = ({ ingredients, name }) => {
    const classes = useStyles();
    const context = useContext(Context);
    const [stateIngredient, dispatchIngredient] = useReducer(IngredientReducer.IngredientReducer, IngredientReducer.initialState);
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);


    const deleteContact = async id => {
        try {
          const response = await axios.delete(`http://localhost/api/${name}/${id}`, { headers: context.authObj.authHeader() });
          console.log(response)
          dispatchIngredient(ACTIONS.delete_ingredient(response.data.data || response.data));
          
        } catch (error) {
          flashErrorMessage(dispatchMessage, error)
        }
      };
    
    const list = () => {
        
        return ingredients.map(ingredient => {
            return (
              <TableRow key={ingredient.id}>
                <TableCell component="th" scope="row">{ingredient.name}</TableCell>
                <TableCell align="right">{ingredient.type}</TableCell>
                <TableCell align="right">{ingredient.amount}</TableCell>
                <TableCell align="right">{ingredient.expiration_date}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                <IconButton aria-label="edit" component={NavLink} to={`/ingredients/${name}/${ingredient.id}`}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteContact(ingredient.id)} >
                    <DeleteIcon />
                </IconButton>
                </TableCell>
                </TableRow>   
                
            )
        })  
        
    }

    return (
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Exp date</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
            <TableBody>{list()}</TableBody>
            </Table>
            </TableContainer>
            
            {stateIngredient.message.content && <FlashMessage message={stateIngredient.message} />}
        </div>
      );
    
}

export default IngredientList




