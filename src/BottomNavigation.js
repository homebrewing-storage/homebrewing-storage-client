import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { NavLink, Route, Switch } from 'react-router-dom';
import IngredientListPage from './pages/ingredientListPage';
import IngredientFormPage from './pages/ingredientFormPage';
import YeastsPage from './pages/yeastsPage';
import HopsPage from './pages/hopsPage';
import FermentablesPage from './pages/fermentablesPage';
import ExtrasPage from './pages/extrasPage';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation({match}) {
    const pathname = window.location.pathname;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const bottomName = match;

    
    console.log(bottomName);
    
  return (
    <div>
        <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.root}
        >
        
        <BottomNavigationAction label="Ingredients List" icon={<ListIcon />} component={NavLink} to={bottomName.path} />
        <BottomNavigationAction label="Add Ingredient" icon={<AddIcon />} component={NavLink} to={`${bottomName.path}/new`} />

        </BottomNavigation>
    <Switch>
      <Route exact path={`${bottomName.path}/new`}
      render={({match}) => {
        return (
          <div>
            <IngredientFormPage />
          </div>
          ) 
      }}
      >
      </Route>
      <Route exact path='/ingredients/yeasts' component={YeastsPage} />
      <Route exact path='/ingredients/hops' component={HopsPage} />
      <Route exact path='/ingredients/fermentables' component={FermentablesPage} />
      <Route exact path='/ingredients/extras' component={ExtrasPage} />
    </Switch>
    </div>
  );
}
