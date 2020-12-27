import React, { useContext, useEffect } from 'react';
import Context from '../utils/context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const API_URL = "http://localhost/api/";

const Profile = (props) => {
  const context = useContext(Context)

  useEffect(() => {
    console.log('profile')
  }, [])
  
  const RenderProfile = (props) => {
    return(
      <div>
        
      </div>
     )
   }


    return(
      <div>
        <h1>Profile</h1>
        <RenderProfile profile={context.authObj.userProfile} />
      </div>
  )}



export default (Profile);