import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from '@mui/x-date-pickers/'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
}

export default function UserAddDlg(props) {
  const { info, handleClose } = props;

  const [formdata, setFormData] = React.useState(defaultFormData);

  React.useEffect(() => {
    if (info.info !== null)
      setFormData(info.info);
  }, [info]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (info.action === 'add') {
      axios.post("http://192.168.140.37:5000" + '/api/auth/add', formdata)
        .then(res => {
          Swal.fire({
            icon: "info",
            title: "",
            text: res.data.message,
          });
          if (res.data.success === true) {
            window.location.reload();
          }
        })
        .catch(err => { console.log(err); alert(err); });
    } else {

      axios.post("http://192.168.140.37:5000" + '/api/auth/update', { _data: formdata, _id: info.info._id })
        .then(res => {
          if (res.data.success === true) {
            Swal.fire({
              icon: "success",
              title: "",
              text: res.data.message,
            });
            handleClose(res.data.user);
          }
        })
        .catch(err => console.log(err));

    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formdata, [event.target.id]: event.target.value });
  };

  const handleChangeDate = (value) => {
    setFormData({ ...formdata, birthday: value });
  };

  function canBeSubmitted() {
    return formdata.brand !== '' && formdata.user !== '' && formdata.owner !== '';
  }

  return (
    // <React.Fragment>
    //   <BootstrapDialog
    //     onClose={handleClose}
    //     aria-labelledby="customized-dialog-title"
    //     open={info.open}
    //     maxWidth="xl"
    //   >
    //     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    //       User Information
    //     </DialogTitle>
    //     <IconButton
    //       aria-label="close"
    //       onClick={handleClose}
    //       sx={(theme) => ({
    //         position: 'absolute',
    //         right: 8,
    //         top: 8,
    //         color: theme.palette.grey[500],
    //       })}
    //     >
    //       <CloseIcon />
    //     </IconButton>
    //     <DialogContent dividers>
    //       <div>

    //         <Card sx={{ minWidth: 300 }}>
    //         <CardContent>
    //         <form className="space-y-2" action="#" method="POST" onSubmit={handleSubmit}>
    //             <div>
    //               <label htmlFor="userid" className="block text-sm/6 font-medium text-gray-900">User ID</label>
    //               <div className="mt-2">
    //               <input type="text" value={formdata.userid} onChange={handleChange} id="userid" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='jgm127'/>
    //               </div>
    //             </div>
    //             <div>
    //                 <div className="flex items-center justify-between">
    //                     <label htmlFor ="username" className="block text-sm/6 font-medium text-gray-900">User Name</label>
    //                 </div>
    //                 <div className="mt-2">
    //                     <input type="text" onChange={handleChange} value={formdata.username} id="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='JuGwangMyong'/>
    //                 </div>
    //             </div>
    //             {/* <div>
    //                 <div className="flex items-center justify-between">
    //                     <label htmlFor ="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
    //                 </div>
    //                 <div className="mt-2">
    //                     <input type="password" onChange={handleChange} value={formdata.password} id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    //                 </div>
    //             </div> */}
    //             <div className = "flex" >
    //               <div className="flex items-center justify-between mt-5">
    //                   <label htmlFor ="birthday" className="block text-sm/6 font-medium text-gray-900">Birthday</label>
    //               </div>
    //               <div className="mt-5 ml-20">
    //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                 <DatePicker
    //                   selected={formdata.birthday}
    //                   dateFormat="yyyy/MM/dd"
    //                   onChange={handleChangeDate} 
    //                   />
    //                 </LocalizationProvider>
    //               </div>
    //           </div>

    //           {/* <div>
    //             <FormControl>
    //                 <RadioGroup
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                     name="controlled-radio-buttons-group"
    //                     value={formdata.gender}
    //                     onChange={handleChangeGender}
    //                 >
    //                     <FormControlLabel value="male" control={<Radio />} label="Male" />
    //                     <FormControlLabel value="female" control={<Radio />} label="Female" />
    //                 </RadioGroup>
    //             </FormControl>
    //           </div> */}
    //           <div className='flex'>
    //             <div className='mr-5'>
    //               <div className="flex items-center justify-between">
    //                   <label htmlFor ="unit" className="block text-sm/6 font-medium text-gray-900">Unit</label>
    //               </div>
    //               <div className="mt-2">
    //                   <input type="text" id="unit" value={formdata.unit} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    //               </div>
    //             </div>

    //             <div>
    //               <div className="flex items-center justify-between">
    //                   <label htmlFor ="group" className="block text-sm/6 font-medium text-gray-900">Group</label>
    //               </div>
    //               <div className="mt-2">
    //                   <input type="text" id="group" value={formdata.group} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="flex items-center justify-between">
    //                 <label htmlFor ="netkey_username" className="block text-sm/6 font-medium text-gray-900">NetKey User Name</label>
    //             </div>
    //             <div className="mt-2">
    //                 <input type="text" id="netkey_username" onChange={handleChange} value={formdata.netkey_username} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    //             </div>
    //           </div>
    //           <div>
    //             <div className="flex items-center justify-between">
    //                 <label htmlFor ="netkey_machinename" className="block text-sm/6 font-medium text-gray-900">NetKey Machine Name</label>
    //             </div>
    //             <div className="mt-2">
    //                 <input type="text" id="netkey_machinename" onChange={handleChange} value={formdata.netkey_machinename} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    //             </div>
    //           </div>
    //           {/* <div>
    //             <Checkbox id = "isadmin" value = {formdata.isadmin} onChange={handleChange}/>
    //             <Checkbox />
    //             Role As Administrator

    //           </div> */}
    //           </form>
    //           </CardContent>
    //           </Card>

    //       </div>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button autoFocus onClick={handleSubmit} variant='primary' disabled={!canBeSubmitted()}>
    //         Save
    //       </Button>
    //     </DialogActions>
    //   </BootstrapDialog>
    // </React.Fragment>

    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={info.open}

        maxWidth="lg" // Set a maximum width for the dialog
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          User Information
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
          <div>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit}>
                  {/** User ID */}
                  <div>
                    <label htmlFor="userid" className="block text-sm font-medium text-gray-900">User ID</label>
                    <div className="mt-2">
                      <input type="text" value={formdata.userid} onChange={handleChange} id="userid" required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        placeholder='jgm127'
                      />
                    </div>
                  </div>

                  {/** User Name */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-900">User Name</label>
                    <div className="mt-2">
                      <input type="text" onChange={handleChange} value={formdata.username} id="username" required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        placeholder='JuGwangMyong'
                      />
                    </div>
                  </div>

                  {/** Birthday */}
                  <div className='flex items-center justify-between'>
                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-900">Birthday</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(formdata.birthday)}
                        dateFormat="yyyy/MM/dd"
                        onChange={(newValue) => handleChangeDate(newValue)} // Handle date change
                        renderInput={(params) => <TextField {...params} />}
                      // className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500 sm:w-auto"
                      />
                    </LocalizationProvider>
                  </div>

                  {/** Unit and Group */}
                  <div className='flex flex-col sm:flex-row justify-between gap-x-4'>
                    {/** Unit */}
                    <div className='flex-grow'>
                      <label htmlFor="unit" className="block text-sm font-medium text-gray-900">Unit</label>
                      <div className="mt-2">
                        <input type="text" id="unit" value={formdata.unit} onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/** Group */}
                    <div className='flex-grow'>
                      <label htmlFor="group" className="block text-sm font-medium text-gray-900">Group</label>
                      <div className="mt-2">
                        <input type="text" id="group" value={formdata.group} onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/** NetKey User Name */}
                  <div>
                    <label htmlFor="netkey_username" className="block text-sm font-medium text-gray-900">NetKey User Name</label>
                    <div className="mt-2">
                      <input type="text" id="netkey_username" onChange={handleChange} value={formdata.netkey_username}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/** NetKey Machine Name */}
                  <div>
                    <label htmlFor="netkey_machinename" className="block text-sm font-medium text-gray-900">NetKey Machine Name</label>
                    <div className="mt-2">
                      <input type="text" id="netkey_machinename" onChange={handleChange} value={formdata.netkey_machinename}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox checked={formdata.isadmin} onChange={() => setFormData({ ...formdata, isadmin: (!formdata.isadmin) })}/>}
                      label="Administrator"
                    />
                  </div>

                </form>
              </CardContent>
            </Card>
          </div>
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