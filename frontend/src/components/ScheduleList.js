import React, { useEffect, useState } from 'react';
import './BirthdayList.css'; // Import the CSS file for styles
import axios from 'axios';

const ScheduleList = () => {
    const [lectureList, setLectureList] = useState([]);

    // Sample user data
    // const users = [
    //     { name: 'Alice', birthday: '2024-12-27' }, // Change dates for testing
    //     { name: 'Bob', birthday: '2024-12-27' },
    //     { name: 'Charlie', birthday: '2024-01-15' },
    //     // Add more users as needed
    // ];

    React.useEffect(() => {
        axios.get("http://192.168.140.37:5000" + '/api/lecture/getlectures')
            .then(res => {
                const today = new Date();
                const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

                const lectures = res.data.lectures;
                const todayBirthdays = lectures.filter(lecture => (lecture.lecture_date.toString().split('T')[0]) === todayString);
                setLectureList(todayBirthdays);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="birthday-notification">
            <h2> Today's Lectures </h2>
            {lectureList.length > 0 ? (
                <ul className="birthday-list">
                    {lectureList.map((person, index) => (
                        
                        <li key={index} className="birthday-item">
                            {person.teacher}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Lecture today!</p>
            )}
        </div>
    );
};

export default ScheduleList;
