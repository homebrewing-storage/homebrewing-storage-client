import React, { useContext } from 'react'
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
import { flashErrorMessage }  from  './flashMessage';
import { IngredientContext }  from  '../context/ingredientContext';
import axios  from  'axios';
import IngredientPage from '../pages/ingredientPage';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const IngredientList = ({ ingredients, name }) => {
    const classes = useStyles();
    /*const [state, dispatch] = useContext(IngredientContext);

    const deleteContact = async id => {
        try {
          const response = await axios.delete(
            `http://localhost/api/${name}/${id}`,
          );
          dispatch({
            type: 'DELETE_INGREDIENT',
            payload: response.data,
          });
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
    */
    const list = () => {
      
        return ingredients.map(ingredient => {
            return (
              <TableRow key={ingredient.id}>
              <TableCell>{ingredient.id}</TableCell>
                <TableCell component="th" scope="row">{ingredient.name}</TableCell>
                <TableCell align="right">{ingredient.type}</TableCell>
                <TableCell align="right">{ingredient.amount}</TableCell>
                <TableCell align="right">{ingredient.expiration_date}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                <IconButton aria-label="edit" component={NavLink} to={`/ingredients/${name}/${ingredient.id}`}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" /*onClick={() => deleteContact(ingredient.id)}*/>
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
                    <TableCell>ID</TableCell>
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
            
        </div>
      );
    
}

export default IngredientList




