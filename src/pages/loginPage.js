import React, { useEffect, useState, useContext, useReducer } from "react";
import { Input, Select, MenuItem, TextField } from "@material-ui/core";
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



const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    }
}))

const LoginPage = () => {
  const { handleSubmit, register, errors, control} = useForm();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [loading, setLoading] = useState(null);
  const context = useContext(Context);
  const classes = useStyles();


  const onSubmit = async data => {
    await context.authObj.login(data)
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
        onchange={e => setEmail(e.target.value)}
        type="email"
        ></TextField>
      <TextField 
        className={classes.form}
        variant="outlined"
        name="password" 
        inputRef={register({ required: true })} 
        label="password" 
        onchange={e => setPassword(e.target.value)} 
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
    {loading ? <CircularProgress className={classes.form}/> : <div></div>}
    </Grid>
    </Container>
  );

    

}

export default LoginPage;