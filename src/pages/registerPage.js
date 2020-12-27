import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const register = async data => {

    const params = {
      "email": "siema@siema.pl",
      "password": "zaq1@WSX"
    }
  
    try {
      const response = await axios.post(`http://localhost/api/register`, params);
      console.log(response.data);
    } catch (error) {
      /* flashErrorMessage(error); */
      console.log(error)
    }
    
  };
  
  const onSubmit = async data => {
    console.log(data)
    await register(data);
  };

const RegisterPage = () => {
    const { handleSubmit, register, errors, control} = useForm();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
        <TextField name="name" inputRef={register({ required: true })} label="name" onchange={e => setName(e.target.value)}></TextField>
        <TextField name="surname" inputRef={register({ required: true })} label="surname" onchange={e => setSurname(e.target.value)}></TextField>
        <TextField name="email" inputRef={register({ required: true })} label="email" onchange={e => setEmail(e.target.value)}></TextField>
        <TextField name="password_confirmation" inputRef={register({ required: true })} label="password confirmation" onchange={e => setPasswordConfirmation(e.target.value)}></TextField> 
        <TextField name="password" inputRef={register({ required: true })} label="password" onchange={e => setPassword(e.target.value)}></TextField>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
        Register
        </Button>
        </form>
    )
}

export default RegisterPage
