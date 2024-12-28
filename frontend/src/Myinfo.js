import React, { useState } from 'react'

import NavBar from './components/NavBar'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

import AuthServ from "./Auth";
import axios from 'axios';
import Swal from 'sweetalert2';

const currentUser = AuthServ.getUserInfo();
const defaultFormData = {
    userid: '',
    username: '',
    birthday: new Date(),
    group: '',
    unit: '',
    netkey_username: '',
    netkey_machinename: '',
    isadmin: false,
    _id: null,
};

const defaultPasswordData = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
};

function Myinfo() {


    const [formData, setFormData] = useState(currentUser);

    const [passwordData, setPasswordData] = useState(defaultPasswordData);

    const handleChangeBirthday = (value) => {
        setFormData({ ...formData, birthday: value });
    };
    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSave = (event) => {
        event.preventDefault();

        Swal.fire({
            title: "Confirm",
            text: "Are you sure to save this data?",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://192.168.140.37:5000" + '/api/auth/update', { _id: currentUser._id, _data: formData })
                    .then(res => {
                        if (res.data.success === true) {
                            Swal.fire({
                                title: "Saved!",
                                text: res.data.message,
                                icon: "success"
                            });
                            localStorage.setItem("user", JSON.stringify(formData));
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    const handleChangePassword = (event) => {
        event.preventDefault();

        setPasswordData({ ...passwordData, [event.target.name]: event.target.value });
    }

    const submitChangePassword = (event) => {
        event.preventDefault();
        if (passwordData.newpassword != passwordData.confirmpassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please input correct password.",
            });

            return;
        }
        axios.post("http://192.168.140.37:5000/api/auth/changepassword", { _id: AuthServ.getUserInfo().userid, password: passwordData.oldpassword, newpassword: passwordData.newpassword })
            .then(res => {
                Swal.fire({
                    icon: "info",
                    title: "Change Password",
                    text: res.data.message,
                });
                if (res.data.success == true) {
                    window.location.reload();
                }
            })
            .catch(err => { console.log(err); alert(err); });
    }

    const InputField = ({ label, name, value, onChange, placeholder }) => (
        <>
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-500">{label}</label>
                <input type="text" onChange={onChange} name={name} id={name} required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm mt-2" placeholder={placeholder} value={value} />
            </div>
        </>
    );

    const PasswordField = ({ name, placeholder, onChange }) => (
        <>
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-500">{name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</label>
                <input type="password" name={name} id={name} required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm mt-2" placeholder={placeholder} onChange={onChange} />
            </div>
        </>
    );


    return (
        <>
            <NavBar />

            <div className="flex flex-col md:flex-row mt-10 space-y-5 md:space-y-0 md:space-x-10 mx-4 md:mx-20">
                <div className="flex-col w-full md:w-1/2">
                    <Card sx={{ minWidth: 320 }} className="mt-20">
                        <CardContent className="space-y-3">
                            <Typography variant="h5" component="div"> My Information </Typography>
                            <form className="space-y-3" onSubmit={handleSave}>
                                <div>
                                    <label htmlFor="userid" className="block text-sm font-medium text-gray-500">User ID</label>
                                    <input type="text" onChange={handleChange} name="userid" id="userid" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm mt-2" placeholder='User ID' value={formData.userid} />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-500">User Name</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="username" id="username" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm" value={formData.username} placeholder='User Name' />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center">
                                    <label htmlFor="birthday" className="font-small text-gray-700 mr-4">Birthday :</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/* <DatePicker dateFormat="yyyy/MM/dd" selected={console.log(formData.birthday)} onChange={(newValue) => handleChangeBirthday(newValue)} /> */}
                                        <DatePicker
                                            value={dayjs(formData.birthday)} // Convert string to Day.js object
                                            onChange={(newValue) => handleChangeBirthday(newValue)} // Handle date change
                                            renderInput={(params) => <TextField {...params} />} // Render input field
                                        />
                                    </LocalizationProvider>
                                </div>

                                <InputField label='Group' name='group' value={formData.group} onChange={handleChange} placeholder='124' />
                                <InputField label='Unit' name='unit' value={formData.unit} onChange={handleChange} placeholder='7' />
                                <InputField label='Netkey User Name' name='netkey_username' value={formData.netkey_username} onChange={handleChange} />
                                <InputField label='Netkey Machine Name' name='netkey_machinename' value={formData.netkey_machinename} onChange={handleChange} />

                                <div className="flex justify-end">
                                    <button type="submit" className="bg-red-300 mt-5 mr-5 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-indigo-500">Save</button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-col w-full md:w-1/2 space-y-5">
                    <Card sx={{ minWidth: 320 }} className="mt-20">
                        <CardContent className="space-y-6">
                            <Typography variant="h5" component="div"> Change Password </Typography>
                            <form onSubmit={submitChangePassword} className="space-y-6">

                                {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => (
                                    <PasswordField key={index} name={field} placeholder='Password' onChange={handleChangePassword} />
                                ))}

                                <div className="flex justify-end">
                                    <button type="submit" className="bg-indigo-300 mt-5 mr-5 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-indigo-500">Change Password</button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>


            {/* <div className="flex mt-10 space-x-10 ml-20">
                <div className="flex-col">
                    <Card sx={{ minWidth: 420 }} className="mt-20">
                        <CardContent className="space-y-3">
                            <Typography variant="h5" component="div">
                                My Information
                            </Typography>
                            <form className="space-y-3" onSubmit={handleSave}>
                                <div >
                                    <label htmlFor="userid" className="block text-sm/6 font-medium text-gray-500">User ID</label>
                                    <input type="text" onChange={handleChange} name="userid" id="userid" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2" placeholder='User ID' value={formData.userid} />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-500">User Name</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="username" id="username" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" value={formData.username} placeholder='User Name' />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-col mt-4">
                                        <label htmlFor="birthday" className="font-small text-gray-700">Birthday :</label>
                                    </div>
                                    <div className="flex-col ml-14">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker dateFormat="yyyy/MM/dd" selected={formData.birthday} onChange={(newValue) => handleChangeBirthday(newValue)} />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="group" className="block text-sm/6 font-small text-gray-700">Group</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="group" id="group" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='124' value={formData.group} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="unit" className="block text-sm/6 font-small text-gray-700">Unit</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="unit" id="unit" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='7' value={formData.unit} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="netkey_username" className="block text-sm/6 font-small text-gray-700">Netkey User Name</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="netkey_username" id="netkey_username" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder=''
                                            value={formData.netkey_username} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="netkey_machinename" className="block text-sm/6 font-small text-gray-700">Netkey Machine Name</label>
                                    </div>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} name="netkey_machinename" id="netkey_machinename" className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 " value={formData.netkey_machinename} netName='' />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className=" justify-center bg-red-300 mt-5 mr-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-col space-y-5">
                    <Card sx={{ minWidth: 400 }} className="mt-20">
                        <CardContent className="space-y-6">
                            <Typography variant="h5" component="div">
                                Change Password
                            </Typography>

                            <form onSubmit={submitChangePassword} className="space-y-6">
                                <div >
                                    <div>
                                        Current Password:
                                    </div>
                                    <div className="ml-10 mt-2">
                                        <input type="password" name="oldpassword" id="oldpassword" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Password' onChange={handleChangePassword} />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        New Password:
                                    </div>
                                    <div className="ml-10 mt-2">
                                        <input type="password" name="newpassword" id="newpassword" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Password' onChange={handleChangePassword} />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        Confirm Password:
                                    </div>
                                    <div className="ml-10 mt-2">
                                        <input type="password" name="confirmpassword" id="confirmpassword" required className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Password' onChange={handleChangePassword} />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" className=" justify-center bg-indigo-300 mt-5 mr-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Change Password</button>
                                </div>
                            </form>


                        </CardContent>
                    </Card>


                </div>
            </div> */}



        </>
    )
}

export default Myinfo