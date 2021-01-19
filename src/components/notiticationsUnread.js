import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import Context from '../utils/context';
import NotificationCard from '../components/notificationCard';

const NotificationsPage = () => {
    const context = useContext(Context)

    useEffect(() => {
        axios.get('http://vps-71bedefd.vps.ovh.net/api/unread-Notifications', { headers: context.authObj.authHeader() })
        .then(res => {
            context.handleFetchNotifications(res.data)
        })
        
    }, [])

    return (
        <div>
            <NotificationCard notification={context.notificationsState}/>
        </div>
    )
}

export default NotificationsPage
