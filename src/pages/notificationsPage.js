import React, { useEffect } from 'react'
import axios from 'axios';

const NotificationsPage = () => {

    useEffect(() => {
        axios.get('http://localhost/api/notifications')
        .then(res => console.log(res))
        
    }, [])

    return (
        <div>
            <h1>Notifications Page</h1>
        </div>
    )
}

export default NotificationsPage
