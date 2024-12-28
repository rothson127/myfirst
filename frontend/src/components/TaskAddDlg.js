import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AuthServ from '../Auth';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';

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
    project: '',
    stack: '',
    price: '',
    description: '',
    url: '',
    startdate: null,
    enddate: null,
    _id: null,
}

export default function TaslAddDlg(props) {
    const { info, handleClose } = props;

    const [formData, setFormData] = React.useState(defaultFormData);

    React.useEffect(() => {
        if (info.info !== null)
            setFormData(info.info);
    }, [info]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (info.action === 'add') {
            axios.post("http://192.168.140.37:5000" + '/api/task/add', formData)
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
            axios.post("http://192.168.140.37:5000" + '/api/task/update', formData)
                .then(res => {
                    if (res.data.success === true) {
                        Swal.fire({
                            icon: "success",
                            title: "",
                            text: res.data.message,
                        });
                        handleClose(res.data.task);
                    }
                })
                .catch(err => console.log(err));
        }
    }


    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleChangeStartDate = (value) => {
        setFormData({ ...formData, startdate: value });
    };

    const handleChangeEndDate = (value) => {
        setFormData({ ...formData, enddate: value });
    };

    function canBeSubmitted() {
        return formData.username !== '' && formData.stack != null && formData.price != null && formData.description !== '' && formData.url !== '' && formData.startdate !== null && formData.enddate !== null;
    }

    return (
        // <React.Fragment>
        //     <BootstrapDialog
        //         onClose={handleClose}
        //         aria-labelledby="customized-dialog-title"
        //         open={info.open}
        //     >
        //         <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
        //             Task Information
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
        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">User Name</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.username} id="username" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>


        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="project" className="block text-sm/6 font-medium text-gray-900">Project</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.project} id="project" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>

        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="stack" className="block text-sm/6 font-medium text-gray-900">Stack</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.stack} id="stack" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>

        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Price</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.price} id="price" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>

        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Description</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.description} id="description" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
        //                                 </div>
        //                             </div>

        //                             <div >
        //                                 <div className="flex items-center justify-between">
        //                                     <label htmlFor="url" className="block text-sm/6 font-medium text-gray-900">Url</label>
        //                                 </div>
        //                                 <div className="mt-2">
        //                                     <input type="text" onChange={handleChange} value={formData.url} id="url" required className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='xxx' />
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
                    Task Information
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
                            <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit}>
                                {/** User Name */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-900">User Name</label>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} value={formData.username} id="username" required
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder='xxx'
                                        />
                                    </div>
                                </div>

                                {/** Project */}
                                <div>
                                    <label htmlFor="project" className="block text-sm font-medium text-gray-900">Project</label>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} value={formData.project} id="project" required
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder='xxx'
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    {/** Stack */}
                                    <div className="w-full">
                                        <label htmlFor="stack" className="block text-sm font-medium text-gray-900">Stack</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} value={formData.stack} id="stack" required
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder='xxx'
                                            />
                                        </div>
                                    </div>

                                    {/** Price */}
                                    <div className="w-full">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price</label>
                                        <div className="mt-2">
                                            <input type="text" onChange={handleChange} value={formData.price} id="price" required
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                                placeholder='xxx'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/** Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} value={formData.description} id="description" required
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder='xxx'
                                        />
                                    </div>
                                </div>

                                {/** URL */}
                                <div>
                                    <label htmlFor="url" className="block text-sm font-medium text-gray-900">Url</label>
                                    <div className="mt-2">
                                        <input type="text" onChange={handleChange} value={formData.url} id="url" required
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder='xxx'
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    {/** StartDate */}
                                    <div>
                                        <label htmlFor="startdate" className="block text-sm font-medium text-gray-900">StartDate</label>
                                        <div className="mt-2">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker
                                                    value={dayjs(formData.startdate)}
                                                    onChange={(newValue) => handleChangeStartDate(newValue)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>


                                    {/** EndDate */}
                                    <div>
                                        <label htmlFor="enddate" className="block text-sm font-medium text-gray-900">EndDate</label>
                                        <div className="mt-2">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker
                                                    value={dayjs(formData.enddate)}
                                                    onChange={(newValue) => handleChangeEndDate(newValue)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} variant='contained' color='primary' disabled={!canBeSubmitted()}>
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog >
        </React.Fragment >

    );
}