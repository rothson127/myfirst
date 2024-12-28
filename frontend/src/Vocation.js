import React, { useState } from 'react'
import NavBar from './components/NavBar'
import VocationCard from './components/VocationCard';
import Footer from './components/Footer';
function Vocation() {
    return (
        <>
            <NavBar/>
            <div className="mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <VocationCard />
            </div>
            <Footer/>
        </>
    )
}

export default Vocation;