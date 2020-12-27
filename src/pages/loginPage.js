import React, { useEffect, useState, useContext, useReducer } from "react";
import { Input, Select, MenuItem, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FlashMessage, flashErrorMessage } from '../components/flashMessage';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Context from '../utils/context';



const LoginPage = () => {
  const { handleSubmit, register, errors, control} = useForm();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [loading, setLoading] = useState(null);
  const context = useContext(Context);



  const onSubmit = async data => {
    await context.authObj.login(data).then({
    });
    setLoading(true);
  };

  

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <TextField name="email" inputRef={register({ required: true })} label="email" onchange={e => setEmail(e.target.value)}></TextField>
      <TextField name="password" inputRef={register({ required: true })} label="password" onchange={e => setPassword(e.target.value)} type="password"></TextField>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Log in
      </Button>
      
    </form>
    {loading ? <CircularProgress /> : <div></div>}
    </div>
  );

    

}

export default LoginPage;