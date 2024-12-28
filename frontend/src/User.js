import React, { useState } from 'react'

import NavBar from './components/NavBar'
import UserCard from './components/UserCard'
import Footer from './components/Footer'

function User() {
    return (
        <>
            <NavBar/>
            <div className=" mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <UserCard />
            </div>
            <Footer/>
        </>
    )
}

export default User