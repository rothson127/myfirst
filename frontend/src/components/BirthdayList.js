import React, { useEffect, useState } from 'react';
import './BirthdayList.css'; // Import the CSS file for styles
import axios from 'axios';

const BirthdayList = () => {
    const [birthdayPeople, setBirthdayPeople] = useState([]);

    // Sample user data
    // const users = [
    //     { name: 'Alice', birthday: '2024-12-27' }, // Change dates for testing
    //     { name: 'Bob', birthday: '2024-12-27' },
    //     { name: 'Charlie', birthday: '2024-01-15' },
    //     // Add more users as needed
    // ];

    React.useEffect(() => {
        axios.get("http://192.168.140.37:5000" + '/api/auth/getusers')
            .then(res => {
                const users = res.data.userList;
                const today = new Date();
                const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
                // Filter users whose birthday is today
                const todayBirthdays = users.filter(user => (user.birthday.toString().split('T')[0]) === todayString);
                setBirthdayPeople(todayBirthdays);

            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div className="birthday-notification">
            <h2>🎉 Today's Birthdays 🎉</h2>
            {birthdayPeople.length > 0 ? (
                <ul className="birthday-list">
                    {birthdayPeople.map((person, index) => (
                        <li key={index} className="birthday-item">
                            {person.username}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No birthdays today!</p>
            )}
        </div>
    );
};

export default BirthdayList;
