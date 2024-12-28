import React, { useState } from 'react'
import NavBar from './components/NavBar'
import LectureCard from './components/LectureCard';
import Footer from './components/Footer';
function Lecture() {
    return (
        <>
            <NavBar/>
            <div className="mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <LectureCard />
            </div>
            <Footer/>
        </>
    )
}

export default Lecture