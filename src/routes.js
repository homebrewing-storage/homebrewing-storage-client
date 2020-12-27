import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './utils/history';
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



const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/'}} />
  }
  />
)

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  },
  toolbar: theme.mixins.toolbar,
}));

const Routes = () => {
    const context = useContext(Context)
    const classes = useStyles();


      return(
          <div>
                <Sidebar />
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <Route exact path="/" />
                  <Route exact path='/login' component={LoginPage}></Route>
                  <Route exact path='/register' component={RegisterPage}></Route>
                  <Route exact path="/notifications" component={NotificationsPage}></Route>
                  <Route exact path="/user" component={UserPage}></Route>
                  <Route path="/logs" component={LogsPage}></Route>
                  <Route path="/ingredients/yeasts" component={YeastsPage}></Route>
                  <Route path="/ingredients/hops" component={HopsPage}></Route>
                  <Route path="/ingredients/fermentables" component={FermentablesPage}></Route>
                  <Route path="/ingredients/extras" component={ExtrasPage}></Route>
                  <Route path='/authcheck' component={AuthCheck} />
                  <PrivateRoute path="/profile"
                            auth={context.authState}
                            component={Profile} />
                </Switch>
                </main>
            </div>
          
          )}

export default Routes;