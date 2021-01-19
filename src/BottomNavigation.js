import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation({match}) {
    const pathname = window.location.pathname;
    const classes = useStyles();
    const [value, setValue] = React.useState(pathname);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
  return (
    <div>
        <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.root}
        >
        
          <BottomNavigationAction label="All" icon={<ListIcon />} value="/notifications/all" component={NavLink} to='/notifications/all' />
          <BottomNavigationAction label="Unread" icon={<AddIcon />} value="/notifications/unread" component={NavLink} to='/notifications/unread' />

        </BottomNavigation>

    </div>
  );
}
