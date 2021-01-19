import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import Context from '../utils/context';
import NotificationCard from '../components/notificationCard';

const NotificationsPage = () => {
    const context = useContext(Context)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios.get('http://vps-71bedefd.vps.ovh.net/api/notifications', { headers: context.authObj.authHeader() })
        .then(res => {
            setNotifications(res.data)
            context.handleFetchNotifications(res.data)
        })
    }, [setNotifications])

    return (
        <div>
            <NotificationCard notification={context.notificationsState}/>
        </div>
    )
}

export default NotificationsPage
