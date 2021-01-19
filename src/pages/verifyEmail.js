import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Context from '../utils/context';

const VerifyEmail = () => {

    const context = useContext(Context);
    const location = useLocation();
    const [state, setState] = useState('');

    useEffect(() => {
        axios.get(`http://vps-71bedefd.vps.ovh.net${location.pathname}${location.search}`, { headers: context.authObj.authHeader()} )
        .then(res => {
            setState(res.data.message)
        }
       )

    }, [])

    return (
        <div>
            <h1>Verify email</h1>
            {state}
        </div>
    )
}

export default VerifyEmail
