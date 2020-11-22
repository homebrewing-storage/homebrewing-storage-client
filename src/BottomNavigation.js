import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { NavLink, Route } from 'react-router-dom';
import IngredientListPage from './pages/ingredientListPage';
import IngredientFormPage from './pages/ingredientFormPage';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

  return (
    <div>
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >

            <BottomNavigationAction label="Ingredients List" icon={<ListIcon />} component={NavLink} to="/ingredients" />
            <BottomNavigationAction label="Add Ingredient" icon={<AddIcon />} component={NavLink} to="/ingredients/new" />

        </BottomNavigation>
    <Route exact path="/ingredients" component={IngredientListPage} />
    <Route path="/ingredients/new" component={IngredientFormPage} />
    <Route path="/ingredients/edit/:_id" component={IngredientFormPage} />
    </div>
  );
}
