import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import MachineCard from './components/MachineCard';
import Footer from './components/Footer'

function Home() {
    return (
        // <>
        //     <NavBar />
        //     <div className="mr-2 ml-2 mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        //         <MachineCard />
        //     </div>
        //     <Footer />
        // </>
        <>
            <NavBar />
            
            <div className=" mt-10 flex flex-col justify-center px-4 py-12 lg:px-8">
                <div className="">
                    <MachineCard />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home