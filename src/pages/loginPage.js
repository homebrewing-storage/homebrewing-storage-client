import React, { useEffect, useState, useContext, useReducer } from "react";
import { TextField } from "@material-ui/core";
import {useForm, Controller} from 'react-hook-form'
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Context from '../utils/context';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import * as MessageReducer from '../store/reducers/message_reducer';
import * as AuthReducer from '../store/reducers/auth_reducer';
import axios from 'axios';
import * as ACTIONS from '../store/actions/actions';
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
  const { handleSubmit, register, errors, control} = useForm();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ message, setMessage ] = useState('');
  const [loading, setLoading] = useState(null);
  const context = useContext(Context);
  const classes = useStyles();
  const [stateMessage, dispatchMessage] = useReducer(MessageReducer.MessageReducer, MessageReducer.initialState);
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)


  const onSubmit = async (data) => {
    
      axios.get('http://localhost/sanctum/csrf-cookie')
      .then(res => {
        axios.post('http://localhost/api/' + "login", data)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            context.authObj.getUserBoard().then((res) => {
              if(res.status < 400){
                dispatchAuthReducer(ACTIONS.login_success())
                setTimeout(() => { history.replace('/authcheck') }, 800)
                setTimeout(() => { window.location.reload() }, 1200)
              }
            })
          }
          
        }).catch(error => {
          console.log(error.response)
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
        onChange={e => setEmail(e.target.value)}
        type="email"
        ></TextField>
      <TextField 
        className={classes.form}
        variant="outlined"
        name="password" 
        inputRef={register({ required: true })} 
        label="password" 
        onChange={e => setPassword(e.target.value)} 
        type="password"
        ></TextField>
      </Grid>
      <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false}/>}
            label="Remember me"
          />
      <Button className={classes.form} variant="contained" color="primary" type="submit" fullWidth>
        Log in
      </Button>
      <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
        </Grid>
      
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
      <a href="http://localhost/login/facebook">
      <Button className={classes.form} variant="contained" color="primary" type="submit" fullWidth>
        Log in with facebook <FacebookIcon className={classes.icon}/>
      </Button>
      </a>
      <a href="http://localhost/login/github">
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