// Notification.js
import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css'; // Import your CSS for styling
import BirthdayList from './BirthdayList';
import ScheduleList from './ScheduleList';

const Notification = ({ message, type, onClose }) => {
    if (type === 'success') {
        return (
            <div className={`notification ${type}`}>
                <div className="mt-10">
                    <h5>Happy Birthday!</h5>
                    <BirthdayList />
                </div>

                <button onClick={onClose}>X</button>
            </div>
        )
    }
    else {
        return (
            <div className={`notification ${type}`} >
                <div className="mt-10">
                <h3>Welcome to Our Site!</h3>
                    <ScheduleList />
                </div>
                <button onClick={onClose}>X</button>
            </div>
        )
    }
}


Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Notification;