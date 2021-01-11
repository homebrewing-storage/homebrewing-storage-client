import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import Context from '../utils/context';


export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(Context);
  const [userState, setUserState] = useState(null);
  const [auth, setAuth] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (event) => {
    context.authObj.logout();
    setAnchorEl(null);
  }
  
  useEffect(() => {
    if(context.authObj.getCurrentToken() && context.authObj.getUser()){
      setAuth(true)
    }   
  },)

  let authorized;
  if(!auth){
    authorized = <div>
                <MenuItem onClick={handleClose} component={Link} to={'/login'}>Login</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/register'}>Register</MenuItem>
                </div>
  } else {
    authorized = <div>
                  <MenuItem onClick={handleClose} component={Link} to={'/profile'}>{context.userState.name}</MenuItem>
                  <MenuItem onClick={onClick} >Logout</MenuItem>
                  </div> 
  }

  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon></AccountCircleIcon>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {authorized}
      </Menu>
    </div>
  );
}
