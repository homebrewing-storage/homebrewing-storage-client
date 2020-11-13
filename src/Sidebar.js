import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import DescriptionIcon from '@material-ui/icons/Description';
import BottomNavigation from './BottomNavigation';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Homebrewing storage
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          
            <ListItem button key="Ingredients">
              <ListItemIcon><LocalPharmacyIcon /></ListItemIcon>
              <ListItemText primary="Ingredients" />
            </ListItem>

            <ListItem button key="Notifcations">
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifcations" />
            </ListItem>

            <ListItem button key="User">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>

            <ListItem button key="Logs">
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Logs" />
            </ListItem>

            
          
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <BottomNavigation></BottomNavigation>
          </Typography>
      </main>
    </div>
  );
}
