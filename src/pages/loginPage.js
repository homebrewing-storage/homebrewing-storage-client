import React, { useState, useContext, useReducer } from "react";
import { TextField } from "@material-ui/core";
import {useForm} from 'react-hook-form'
import { FlashMessage } from '../components/flashMessage';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Context from '../utils/context';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import * as MessageReducer from '../store/reducers/message_reducer';
import axios from 'axios';
import history from '../utils/history';


const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    icon: {
      marginLeft: theme.spacing(2)
    }
}))

const LoginPage = () => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(null);
  const context = useContext(Context);
  const classes = useStyles();
  const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);


  const onSubmit = async (data) => {
      axios.defaults.withCredentials = true
      context.authObj.login(data)
    
      axios.get('http://vps-71bedefd.vps.ovh.net/sanctum/csrf-cookie', {withCredentials: true})
      .then(res => {
        axios.post('http://vps-71bedefd.vps.ovh.net/api/login', data, {withCredentials: true})
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            context.authObj.getUserBoard().then((res) => {
              if(res.status < 400){
                context.handleUserLogin();
                setTimeout(() => { history.replace('/authcheck') }, 800)
                setTimeout(() => { window.location.reload() }, 1200)
              }
            })
          }
          
        }).catch(error => {
          dispatchMessage({
            type: "ERROR",
            payload: {
              type: 'error',
              content: error.response.data.email || error.response.data.password
            }
          })
          setLoading(false);
        })
      })

    setLoading(true);
    dispatchMessage({
      type: "ERROR",
      payload: {
        type: 'error',
        content: ''
      }
    })
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>   
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <TextField 
        className={classes.form}
        variant="outlined"
        name="email" 
        inputRef={register({ required: true })} 
        label="email" 
        type="email"
        ></TextField>
      <TextField 
        className={classes.form}
        variant="outlined"
        name="password" 
        inputRef={register({ required: true })} 
        label="password" 
        type="password"
        ></TextField>
      </Grid>
      <Button className={classes.form} variant="contained" color="primary" type="submit" fullWidth>
        Log in
      </Button>
      
    </form>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
    <Grid
      container
      direction="column"
      className={classes.form}
    >
      <a href="http://vps-71bedefd.vps.ovh.net/login/facebook">
      <Button className={classes.form} variant="contained" color="primary" type="submit" fullWidth>
        Log in with facebook <FacebookIcon className={classes.icon}/>
      </Button>
      </a>
      <a href="http://vps-71bedefd.vps.ovh.net/login/github">
      <Button className={classes.form} variant="contained" color="primary" type="submit" fullWidth>
        Log in with github <GitHubIcon className={classes.icon}/>
      </Button>
      </a>
      </Grid>
      {loading ? <CircularProgress className={classes.form}/> : <div></div>}
      {stateMessage.message.content && <FlashMessage message={stateMessage.message} />}
    </Grid>
    </Container>
  );


}

export default LoginPage;