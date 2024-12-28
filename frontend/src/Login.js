import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthServ from "./Auth";
import Swal from 'sweetalert2';

function Login() {

    const [values, setValues] = useState({
        userid: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        
        AuthServ.login(values.userid, values.password).then(
            (res) => {
                if (res.data.success) {
                    if (res.data.token) {
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                    }
                    navigate("/");
                    window.location.reload();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data.message,
                    });
                }
            },
            error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login Failed."
                });

            }
        );
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    return (
        // <div className="flex-col px-6 py-12">
        //     <div className = "mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        //         <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-700">Welcome. Please Login.</h2>
        //     </div>

        //     <div className="mt-20 mb-20 sm:mx-auto sm:w-full sm:max-w-sm">
        //         <form className="space-y-8" onSubmit={handleSubmit} method="POST" >
        //             <div className="flex">
        //                 <div className="flex-col sm:w-full sm:mx-auto sm:max-w-sm">
        //                     <label htmlFor="userid" className="  font-medium text-gray-700">User ID : </label>
        //                 </div>
        //                 <div className="flex-col ">
        //                     <input type="text" name="userid" id="userid" required onChange={e => setValues({...values, userid: e.target.value})} className="bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "/>
        //                 </div>
        //             </div>

        //             <div className="flex"> 
        //                 <div className="flex-col sm:w-full sm:mx-auto sm:max-w-sm">
        //                     <label htmlFor ="password" className="font-medium text-gray-700">Password :</label>
        //                 </div>
        //                 <div className="flex-col">
        //                     <input type="password" name="password" id="password" onChange={e => setValues({...values, password: e.target.value})} required className="bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "/>
        //                 </div>
        //             </div>

        //             <div className = "flex">
        //                 <button type="submit" className="flex w-full justify-center bg-red-400 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        //             </div>
        //             <div className = "flex">
        //                 <button type="button" className="flex w-full justify-center bg-indigo-600 px-3 py-1.5  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSignup}>Create new account</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        <div className="flex flex-col px-6 py-12">
            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-700">
                    Welcome. Please Login.
                </h2>
            </div>

            <div className="mt-20 mb-20 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-8" onSubmit={handleSubmit} method="POST">
                    {/* User ID Input */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label htmlFor="userid" className="font-medium text-gray-700 sm:w-1/3">
                            User ID:
                        </label>
                        <input
                            type="text"
                            name="userid"
                            id="userid"
                            required
                            onChange={e => setValues({ ...values, userid: e.target.value })}
                            className="mt-2 sm:mt-0 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:w-2/3"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label htmlFor="password" className="font-medium text-gray-700 sm:w-1/3">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            required
                            className="mt-2 sm:mt-0 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:w-2/3"
                        />
                    </div>

                    {/* Login Button */}
                    <div className="flex">
                        <button
                            type="submit"
                            className="flex w-full justify-center bg-red-400 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>

                    {/* Signup Button */}
                    <div className="flex">
                        <button
                            type="button"
                            className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSignup}
                        >
                            Create new account
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login