// NotificationsManager.js
import React, { useState } from 'react';
import Notification from './components/Notification';

const NotificationsManager = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Automatically remove notification after 10 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 10000);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((note) => note.id !== id));
    };

    return (
        <div className="notifications-container mt-20">
            {notifications.map(({ id, message, type }) => (
                <Notification key={id} message={message} type={type} onClose={() => removeNotification(id)} />
            ))}
            {/* Example buttons to trigger notifications */}
            <button className='btn btn-primary' onClick={() => addNotification('Success!', 'success')}>Show Success</button>
            <button className='btn btn-primary' onClick={() => addNotification('Error occurred!', 'error')}>Show Error</button>
        </div>
    );
};

export default NotificationsManager;
