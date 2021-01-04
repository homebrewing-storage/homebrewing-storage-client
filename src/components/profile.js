import React, { useContext, useEffect, useState } from 'react';
import Context from '../utils/context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';


const Profile = () => {
  const context = useContext(Context);

  
  const RenderProfile = (props) => {

    return(
      <Container component="main" maxWidth="xs">
        <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" >Name: </Typography>
          <Typography variant="h6">{props.profile.name}</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" >Surname: </Typography>
          <Typography variant="h6">{props.profile.surname}</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" >Email: </Typography>
          <Typography variant="h6">{props.profile.email}</Typography>
        </Grid>
        </Grid>
      </Container>
     )
   }

    return(
      <div>
        <h1>Profile</h1>
        <RenderProfile profile={context.userState} />
      </div>
  )}



export default Profile;