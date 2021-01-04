import React, { useContext, useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dropdown from './components/dropdown';
import Menu from './components/menu';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Context from './utils/context';




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
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  dropdown: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    padding: theme.spacing(2),
  }
}));



const PermanentDrawerLeft = () => {
  const classes = useStyles();
  const context = useContext(Context);
  const [auth, setAuthState] = useState(null);

  useEffect(() => {
    if(context.authObj.getCurrentToken()) {
      setAuthState(true);
    } 
  }, [])


  return (
    <div className={classes.root}>
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.dropdown}>
            <Dropdown />
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
        
        <Typography variant="h6" noWrap className={classes.header}>
            Homebrewing storage
        </Typography>
        <Divider />
          <Menu />

        <Divider />
      </Drawer>
            
      
    </div>
  );
}


export default PermanentDrawerLeft;