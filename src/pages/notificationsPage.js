import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import Context from '../utils/context';
import NotificationCard from '../components/notificationCard';

const NotificationsPage = () => {
    const context = useContext(Context)

    useEffect(() => {
        axios.get('http://localhost/api/notifications', { headers: context.authObj.authHeader() })
        .then(res => console.log(res))
        
    }, [])

    return (
        <div>
            <h1>Notifications Page</h1>
            <NotificationCard />
        </div>
    )
}

export default NotificationsPage
