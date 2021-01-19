import React, { useContext, useReducer } from 'react'
import { TextField } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Context from '../utils/context';
import { FlashMessage } from '../components/flashMessage';
import * as AuthReducer from '../store/reducers/auth_reducer';
import axios from 'axios';
import * as ACTIONS from '../store/actions/actions';



const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  }
}))

  

const RegisterPage = () => {
    const { handleSubmit, register } = useForm();
    const classes = useStyles();
    const context = useContext(Context);
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)


    const onSubmit = (data) => {

      axios.get('http://vps-71bedefd.vps.ovh.net/sanctum/csrf-cookie')
      .then(res => {
        axios.post('http://vps-71bedefd.vps.ovh.net/api/register', data)
        .then((res) => {
          dispatchAuthReducer(ACTIONS.register_success());
          localStorage.setItem("token", JSON.stringify(res.data.token));
          return true;
        }).catch(err => console.log(err.response))
      }).catch(err => console.log(err.response))

      
    };


    return (
        <Container maxWidth="xs" component="main">
        <CssBaseline />
        <form  className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
        <TextField name="name" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="name" ></TextField>
        <TextField name="surname" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="surname" ></TextField>
        <TextField name="email" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="email" type="email"></TextField>   
        <TextField name="password" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="password" type="password"></TextField>
        <TextField name="password_confirmation" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="password confirmation" type="password"></TextField> 
        </Grid>
        <Button variant="contained" className={classes.form} fullWidth color="primary" type="submit" >
        Register
        </Button>
        </form>
        {stateAuthReducer.message.content && <FlashMessage message={stateAuthReducer.message} />}
        </Container>
    )
}

export default RegisterPage
