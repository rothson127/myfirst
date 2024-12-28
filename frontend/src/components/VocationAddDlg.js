import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AuthServ from '../Auth';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const defaultFormData = {
    username: '',
    startdate: new Date(),
    enddate: new Date(),
    reason: '',
    _id: null,
}

export default function VocationAddDlg(props) {
    const { info, handleClose } = props;

    const [formData, setFormData] = React.useState(defaultFormData);

    React.useEffect(() => {
        if (info.info !== null)
            setFormData(info.info);
    }, [info]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (info.action === 'add') {
            if (!AuthServ.isAdmin()) formData.username = AuthServ.getUserInfo().username;
            axios.post("http://192.168.140.37:5000" + '/api/vocation/add', formData)
                .then(res => {
                    if (res.data.success === true) {
                        Swal.fire({
                            icon: "success",
                            title: "",
                            text: res.data.message,
                        });
                        window.location.reload();
                    }
                })
                .catch(err => console.log(err));
        } else {
            axios.post("http://192.168.140.37:5000" + '/api/vocation/update', formData)
                .then(res => {
                    if (res.data.success === true) {
                        Swal.fire({
                            icon: "success",
                            title: "",
                            text: res.data.message,
                        });
                        handleClose(res.data.vocation);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    const handleChangeStartDate = (value) => {
        setFormData({ ...formData, startdate: value });
    };

    const handleChangeEndDate = (value) => {
        setFormData({ ...formData, enddate: value });
    };

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    function canBeSubmitted() {
        if (AuthServ.isAdmin())
            return formData.username !== '' && formData.startdate != null && formData.enddate != null && formData.reason !== '';
        else
            return formData.startdate != null && formData.enddate != null && formData.reason !== '';
    }

    return (
        // <React.Fragment>
        //     <BootstrapDialog
        //         onClose={handleClose}
        //         aria-labelledby="customized-dialog-title"
        //         open={info.open}
        //     >
        //         <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
        //             Vocation Information
        //         </DialogTitle>
        //         <IconButton
        //             aria-label="close"
        //             onClick={handleClose}
        //             sx={(theme) => ({
        //                 position: 'absolute',
        //                 right: 8,
        //                 top: 8,
        //                 color: theme.palette.grey[500],
        //             })}
        //         >
        //             <CloseIcon />
        //         </IconButton>
        //         <DialogContent dividers>
        //             <Card>
        //                 <CardContent>
        //                     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //                         <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit} style={{ minWidth: 400 }}>
        //                             {AuthServ.isAdmin() ? (<div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">User Name</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.username} id="username" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>) : (<div></div>)}


        //                             <div>
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="startdate" className="block text-sm/6 font-medium text-gray-900">StartDate</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <DatePicker
        //                                         dateFormat="yyyy/MM/dd"
        //                                         selected={formData.startdate}
        //                                         onChange={handleChangeStartDate}
        //                                     />
        //                                 </div>
        //                             </div>

        //                             <div>
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="enddate" className="block text-sm/6 font-medium text-gray-900">EndDate</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <DatePicker
        //                                         dateFormat="yyyy/MM/dd"
        //                                         selected={formData.enddate}
        //                                         onChange={handleChangeEndDate}
        //                                     />
        //                                 </div>
        //                             </div>

        //                             <div>
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="reason" className="block text-sm/6 font-medium text-gray-900">Reason</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.reason} id="reason" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='3' />
        //                                 </div>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </CardContent>
        //             </Card>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button autoFocus onClick={handleSubmit} variant='primary' disabled={!canBeSubmitted()}>
        //                 Save
        //             </Button>
        //         </DialogActions>
        //     </BootstrapDialog>
        // </React.Fragment>
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={info.open}
                fullWidth
                maxWidth="sm" // Set a maximum width for the dialog
            >
                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                    Vocation Information
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Card>
                        <CardContent>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit}>
                                    {AuthServ.isAdmin() && (
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">User Name</label>
                                            </div>
                                            <div className="mt-2">
                                                <input type="text" onChange={handleChange} value={formData.username} id="username" required
                                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                    placeholder='xxx'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/** Start Date */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="startdate" className="block text-sm font-medium text-gray-900">Start Date</label>
                                        </div>
                                        <div className="mt-2">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                //dateFormat="yyyy/MM/dd"
                                                value={dayjs(formData.startdate)}
                                                onChange={(newValue) => handleChangeStartDate(newValue)}
                                                renderInput={(params) => <TextField {...params} />} 
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                            </LocalizationProvider>
                                        </div>
                                    </div>

                                    {/** End Date */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="enddate" className="block text-sm font-medium text-gray-900">End Date</label>
                                        </div>
                                        <div className="mt-2">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={dayjs(formData.enddate)}
                                                onChange={(newValue) => handleChangeEndDate(newValue)}
                                                renderInput={(params) => <TextField {...params} />} 
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                            </LocalizationProvider>
                                            {/* <DatePicker
                                                dateFormat="yyyy/MM/dd"
                                                selected={formData.enddate}
                                                onChange={handleChangeEndDate}
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                                            /> */}
                                        </div>
                                    </div>

                                    {/** Reason */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="reason" className="block text-sm font-medium text-gray-900">Reason</label>
                                        </div>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} value={formData.reason} id="reason"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder='Enter reason...'
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} variant='contained' color='primary' disabled={!canBeSubmitted()}>
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>

    );
}