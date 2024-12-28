import React, { useState } from 'react'
import NavBar from './components/NavBar'
import TaskCard from './components/TaskCard';
import Footer from './components/Footer';
function Task() {
    return (
        <>
            <NavBar/>
            <div className="mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <TaskCard />
            </div>
            <Footer/>
        </>
    )
}

export default Task