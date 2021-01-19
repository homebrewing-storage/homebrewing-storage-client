import React from 'react'
import BottomNavigation from '../BottomNavigation';
import NotificationsAll from '../components/notificationsAll';
import NotificationsUnread from '../components/notiticationsUnread';
import { Route } from 'react-router-dom';

const NotificationsPage = () => {

    return (
        <div>
            <h1>Notifications Page</h1>
            <BottomNavigation />
            <Route  path="/notifications/all" component={NotificationsAll}></Route>
            <Route  path="/notifications/unread" component={NotificationsUnread}></Route>
        </div>
    )
}

export default NotificationsPage
