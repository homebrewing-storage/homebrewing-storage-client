import React, { useState, useContext, useReducer, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Context from '../utils/context';
import { flashErrorMessage, FlashMessage } from '../components/flashMessage';
import * as ACTIONS from '../store/actions/actions';
import * as MessageReducer from '../store/reducers/message_reducer';
import * as AuthReducer from '../store/reducers/auth_reducer';



const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  }
}))

  

const RegisterPage = () => {
    const { handleSubmit, register, errors, control} = useForm();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const classes = useStyles();
    const context = useContext(Context);
    const [state, setState] = useState({});
    const [tokenState, setToken] = useState('');
    const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)


    useEffect(() => {
      
      console.log(state)

    }, [])


    const dispatchAction = () => {
      const token = context.authObj.isAuthenticated();
      if(token){
        setToken(token)
        dispatchAuthReducer(ACTIONS.register_success())
        
        setState(stateAuthReducer.message)
        console.log()
      } else {
        console.log('error')
      }
      
    }


    const onSubmit = (data) => {
      const res = () => context.authObj.register(data);
      console.log(res())
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
        <TextField name="name" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="name" onchange={e => setName(e.target.value)}></TextField>
        <TextField name="surname" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="surname" onchange={e => setSurname(e.target.value)}></TextField>
        <TextField name="email" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="email" onchange={e => setEmail(e.target.value)} type="email"></TextField>   
        <TextField name="password" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="password" onchange={e => setPassword(e.target.value)} type="password"></TextField>
        <TextField name="password_confirmation" className={classes.form} variant="outlined" inputRef={register({ required: true })} label="password confirmation" onchange={e => setPasswordConfirmation(e.target.value)} type="password"></TextField> 
        </Grid>
        <Button variant="contained" className={classes.form} fullWidth color="primary" type="submit" onClick={() => dispatchAction()}>
        Register
        </Button>
        </form>
        {state.content && <FlashMessage message={state} />}
        </Container>
    )
}

export default RegisterPage
