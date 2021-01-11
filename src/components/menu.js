import React, { useEffect, useState, useContext} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import DescriptionIcon from '@material-ui/icons/Description';
import { NavLink } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Context from '../utils/context';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
      }
}));

const Menu = () => {
    const context = useContext(Context);
    const [auth, setAuth] = useState(null);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClick = () => {
      setOpen(!open);
    };

    useEffect(() => {
      if(context.authObj.getCurrentToken() && context.authObj.getUser()) {
        setAuth(true);
      } 
    })

    let menu;
    if(!auth){
        menu = <div></div>
    } else {
        menu = 
        <List>
          
          <ListItem button key="Ingredients" onClick={handleClick}>
            <ListItemIcon><LocalPharmacyIcon /></ListItemIcon>
            <ListItemText primary="Ingredients" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
          {['Yeasts','Hops','Fermentables','Extras'].map((item, index) => {
            return (
              <List>
              <ListItem button className={classes.nested} component={NavLink} key={item} to={`/ingredients/${item.toLowerCase()}`}>
                <ListItemText primary={item} />
              </ListItem>
              </List>
            )
          }
          )}
          </Collapse>

          <ListItem button key="Notifcations" component={NavLink} to="/notifications">
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary="Notifcations" />
          </ListItem>

          <ListItem button key="User" component={NavLink} to="/user">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>

          <ListItem button key="Logs" component={NavLink} to="/logs">
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>

        </List>    
    }

    return (
        <div>
            {menu}
        </div>
    )
}

export default Menu;
