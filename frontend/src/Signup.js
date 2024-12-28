import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AuthServ from "./Auth";
import Swal from 'sweetalert2';

const member_data = {
    userid: '',
    password: '',
    username: '',
    birthday: null,
    unit: '',
    group: '',
    netkey_username: '',
    netkey_machinename: '',
    admissiondate: null,
    leavedate: null
}

function Signup() {

    const [formData, setFormData] = useState(member_data);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthServ.register(formData).then(
            (response) => {
                Swal.fire({
                    icon: response.data.success? "info" : "error",
                    title: "Sign Up",
                    text: response.data.message,
                });
                //alert(response.data.message);
                if (response.data.success) {
                    navigate("/");
                    //window.location.reload();
                }
            },
            error => {
                Swal.fire({
                    icon: "error",
                    title: "Regsiter",
                    text: "Register Failed.",
                });
            }
        );
    }

    const handleClose = (event) => {
        event.preventDefault();
        navigate('/login');
    }

    const handleChangeBirthday = (value) => {
        setFormData({ ...formData, birthday: value });
    };
    const handleChangeAdmissionDate = (value) => {
        setFormData({ ...formData, admissiondate: value });
    };
    const handleChangeEdit = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        // <div className="  mt-20 ml-20">
        //     <div className="flex">
        //         <h2 className="text-left text-5xl font-bold tracking-tight text-gray-700">Sign up</h2>
        //     </div>

        //     <div className="flex mt-10">
        //         <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
        //             <div>
        //                 {/* <label htmlFor="userid" className="block text-sm/6 font-medium text-gray-900">User ID</label> */}
        //                 <input type="text" onChange={handleChangeEdit} name="userid" id="userid" required className="block w-full px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='User ID' />
        //             </div>

        //             <div>
        //                 {/* <label htmlFor ="password" className="block text-sm/6 font-medium text-gray-900">Password</label> */}
        //                 <input type="password" onChange={handleChangeEdit} name="password" id="password" required className="block w-full px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Password' />
        //             </div>

        //             <div>
        //                 {/*<label htmlFor ="username" className="block text-sm/6 font-medium text-gray-900">User Name</label> */}
        //                 <input type="text" onChange={handleChangeEdit} name="username" id="username" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='User Name' />
        //             </div>

        //             <div className="flex space-x-5  items-center">
        //                 <div className="flex-col">
        //                     <label htmlFor="birthday" className="font-small text-gray-700  items-center" >Birthday :</label>
        //                 </div>
        //                 <div className="flex-col">
        //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                         <DatePicker dateFormat="yyyy/MM/dd" value={formData.birthday} onChange={(newValue) => handleChangeBirthday(newValue)} />
        //                     </LocalizationProvider>
        //                 </div>
        //             </div>

        //             <div className="flex space-x-4 justify-between">
        //                 <div>
        //                     <div>
        //                         <label htmlFor="group" className="block text-sm/6 font-small text-gray-700">Group</label>
        //                     </div>
        //                     <div className="mt-1">
        //                         <input type="text" onChange={handleChangeEdit} name="group" id="group" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='124' />
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <div>
        //                         <label htmlFor="unit" className="block text-sm/6 font-small text-gray-700">Unit</label>
        //                     </div>
        //                     <div className="mt-1">
        //                         <input type="text" onChange={handleChangeEdit} name="unit" id="unit" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='7' />
        //                     </div>
        //                 </div>
        //             </div>

        //             <div>
        //                 <div className="flex items-center justify-between">
        //                     <label htmlFor="netkey_username" className="block text-sm/6 font-small text-gray-700">Netkey User Name</label>
        //                 </div>
        //                 <div className="mt-1">
        //                     <input type="text" onChange={handleChangeEdit} name="netkey_username" id="netkey_username" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='' />
        //                 </div>
        //             </div>

        //             <div>
        //                 <div className="flex items-center justify-between">
        //                     <label htmlFor="netkey_machinename" className="block text-sm/6 font-small text-gray-700">Netkey Machine Name</label>
        //                 </div>
        //                 <div className="mt-1">
        //                     <input type="text" onChange={handleChangeEdit} name="netkey_machinename" id="netkey_machinename" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='' />
        //                 </div>
        //             </div>

        //             <div className="flex space-x-5  items-center justify-between">
        //                 <div className="flex-col">
        //                     <label htmlFor="admissiondate" className="font-small text-gray-700  items-center" >Admission Date :</label>
        //                 </div>
        //                 <div className="flex-col">
        //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                         <DatePicker dateFormat="yyyy/MM/dd" value={formData.admissiondate} onChange={(newValue) => handleChangeAdmissionDate(newValue)} />
        //                     </LocalizationProvider>
        //                 </div>
        //             </div>

        //             {/* <div className="flex space-x-5  items-center justify-between">
        //                 <div className="flex-col">
        //                     <label htmlFor="leavedate" className="font-small text-gray-700  items-center" >Leave Date :</label>
        //                 </div>
        //                 <div className="flex-col">
        //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                         <DatePicker dateFormat="yyyy/MM/dd" value={formData.leavedate} onChange={(newValue) => handleChangeLeaveDate(newValue)} />
        //                     </LocalizationProvider>
        //                 </div>
        //             </div> */}

        //             <div className="flex">
        //                 <button type="submit" className="flex w-full justify-center bg-red-300 mt-5 mr-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Submit</button>
        //                 <button type="button" className="flex w-full justify-center bg-indigo-600 mt-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleClose}>Cancel</button>
        //             </div>


        //         </form>
        //     </div>
        // </div>

        //<div className="flex-col mt-20 mx-4 sm:mx-20" style={{ maxWidth: 400 }}>
        
        
        <div className="flex-col mt-20 mx-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex">
                <h2 className="text-left text-5xl font-bold tracking-tight text-gray-700">Sign up</h2>
            </div>

            <div className="flex mt-10">
                <form className="space-y-4 w-full" method="POST" onSubmit={handleSubmit}>
                    {/* User ID Input */}
                    <div>
                        <input
                            type="text"
                            onChange={handleChangeEdit}
                            name="userid"
                            id="userid"
                            required
                            className="block w-full px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            placeholder='User ID'
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            onChange={handleChangeEdit}
                            name="password"
                            id="password"
                            required
                            className="block w-full px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            placeholder='Password'
                        />
                    </div>

                    {/* User Name Input */}
                    <div>
                        <input
                            type="text"
                            onChange={handleChangeEdit}
                            name="username"
                            id="username"
                            required
                            className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            placeholder='User Name'
                        />
                    </div>

                    {/* Birthday Input */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label htmlFor="birthday" className="font-small text-gray-700 sm:w-auto">Birthday:</label>
                        <div className="mt-2 sm:mt-0 sm:ml-4 w-full">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker dateFormat="yyyy/MM/dd" value={formData.birthday} onChange={(newValue) => handleChangeBirthday(newValue)} />
                            </LocalizationProvider>
                        </div>
                    </div>

                    {/* Group and Unit Inputs */}
                    <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                        <div className="w-full sm:w-[48%]">
                            <label htmlFor="group" className="block text-sm font-small text-gray-700">Group</label>
                            <input
                                type="text"
                                onChange={handleChangeEdit}
                                name="group"
                                id="group"
                                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder='124'
                            />
                        </div>
                        <div className="w-full sm:w-[48%]">
                            <label htmlFor="unit" className="block text-sm font-small text-gray-700">Unit</label>
                            <input
                                type="text"
                                onChange={handleChangeEdit}
                                name="unit"
                                id="unit"
                                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder='7'
                            />
                        </div>
                    </div>

                    {/* Netkey User Name Input */}
                    <div>
                        <label htmlFor="netkey_username" className="block text-sm font-small text-gray-700">Netkey User Name</label>
                        <input
                            type="text"
                            onChange={handleChangeEdit}
                            name="netkey_username"
                            id="netkey_username"
                            className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>

                    {/* Netkey Machine Name Input */}
                    <div>
                        <label htmlFor="netkey_machinename" className="block text-sm font-small text-gray-700">Netkey Machine Name</label>
                        <input
                            type="text"
                            onChange={handleChangeEdit}
                            name="netkey_machinename"
                            id="netkey_machinename"
                            className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>

                    {/* Admission Date Input */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label htmlFor="admissiondate" className="font-small text-gray-700">Admission Date:</label>
                        <div className="mt-2 sm:mt-0 sm:ml-4 w-full">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker dateFormat="yyyy/MM/dd" value={formData.admissiondate} onChange={(newValue) => handleChangeAdmissionDate(newValue)} />
                            </LocalizationProvider>
                        </div>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex flex-col space-y-4 mt-5 md:flex-row md:space-x-4 md:space-y-2">
                        <button type="submit" className="flex mt-2 w-full justify-center bg-red-300 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Submit</button>
                        <button type="button" className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup