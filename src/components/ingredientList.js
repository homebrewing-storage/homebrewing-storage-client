import React, { useContext, useReducer } from 'react'
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
import { NavLink } from 'react-router-dom';
import { flashErrorMessage, FlashMessage }  from  './flashMessage';
import axios  from  'axios';
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
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);


    const deleteContact = async id => {
      axios.defaults.withCredentials = true
        try {
          const response = await axios.delete(`http://vps-71bedefd.vps.ovh.net/api/${name}/${id}`, { headers: context.authObj.authHeader() });
          context.handleDeleteIngredient(id)
        } catch (error) {
          flashErrorMessage(dispatchMessage, error)
        }
      };


    const list = () => {
        
        return ingredients.map(ingredient => {
            return (
              <TableRow key={ingredient.id}>
                <TableCell component="th" scope="row">{ingredient.name}</TableCell>
                <TableCell align="right">{name==="hops" ? ingredient.alpha_acid : ingredient.type.name}</TableCell>
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
                    <TableCell align="right">{name==="hops" ? "Acid alpha" : "Type"}</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Exp date</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
            <TableBody>{list()}</TableBody>
            </Table>
            </TableContainer>
            
            {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}
        </div>
      );
    
}

export default IngredientList




