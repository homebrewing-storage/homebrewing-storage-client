import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Context from './utils/context';
import YeastsPage from './pages/yeastsPage';
import HopsPage from './pages/hopsPage';
import FermentablesPage from './pages/fermentablesPage';
import ExtrasPage from './pages/extrasPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import LogsPage from './pages/logsPage';
import UserPage from './pages/userPage';
import NotificationsPage from './pages/notificationsPage';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './components/profile';
import AuthCheck from './utils/authcheck';
import VerifyEmail from './pages/verifyEmail';
import IngredientPage from './pages/ingredientPage';


const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/'}} />
  }
  />
)

const AuthorizedRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Redirect to={{pathname:'/'}} />
    : <Component auth={auth} {...props} />
  }
  />
)

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  },
  toolbar: theme.mixins.toolbar,
}));

const Routes = () => {
    const context = useContext(Context);
    const classes = useStyles();
    const [auth, setAuthState] = useState(false);

    useEffect(() => {
      if(!(context.authObj.getCurrentToken() && context.authObj.getUser())){
        
      } else {
        setAuthState(true);
      }
    },)  

      return(
          <div>
                <Sidebar />
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <AuthorizedRoute path="/login"
                            auth={auth}
                            component={LoginPage} />
                  <AuthorizedRoute path="/register"
                            auth={auth}
                            component={RegisterPage} />
                  <Route  path="/notifications" component={NotificationsPage}></Route>
                  <Route  path="/user" component={UserPage}></Route>
                  <Route  path="/logs" component={LogsPage}></Route>
                  <Route  path="/ingredients/:name/:id" component={IngredientPage}></Route>
                  <Route  path="/ingredients/yeasts" component={YeastsPage}></Route>
                  <Route  path="/ingredients/hops" component={HopsPage}></Route>
                  <Route  path="/ingredients/fermentables" component={FermentablesPage}></Route>
                  <Route  path="/ingredients/extras" component={ExtrasPage}></Route>
                  <Route  path='/authcheck' component={AuthCheck} />
                  <Route  path='/email/verify/:id/:hash?:expires?:signature' component={VerifyEmail} />
                  <PrivateRoute path="/profile" auth={context.authObj.getCurrentToken() ? true : false} component={Profile} />
                  <Route path='/login/facebook' component={() => { 
                        window.location.href = 'http://localhost/login/facebook'; 
                        return null;
                    }}/>
                  <Route path='http://localhost/login/facebook'></Route> 
                </Switch>
                </main>
            </div>
          
          )}

export default Routes;