import React, { useContext } from 'react';
import Context from '../utils/context';
import { Grid, Typography } from '@material-ui/core';
import Settings from './settings';


const Profile = () => {
  const context = useContext(Context);

  
  const RenderProfile = (props) => {

    return(
      <Grid container>
        <h1>Profile</h1>
        <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" alignItems="center">
          <Typography variant="h5" >Name: </Typography>
          <Typography variant="h6">{props.profile.name}</Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Typography variant="h5" >Surname: </Typography>
          <Typography variant="h6">{props.profile.surname}</Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Typography variant="h5" >Email: </Typography>
          <Typography variant="h6">{props.profile.email}</Typography>
        </Grid>
        </Grid>
      </Grid>
      
     )
   }


    return(
      <Grid container>
        <RenderProfile profile={context.userState} />
        <Settings />
      </Grid>
  )}




export default Profile;