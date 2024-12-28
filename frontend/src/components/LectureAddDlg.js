import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Swal from 'sweetalert2';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const default_formdata = {
  lecture_date: new Date(),
  teacher: '',
  group: '',
  title: '',
  desc: '',
  place: '',
  _id: null,
}

export default function LectureAddDlg(props) {
  const { info, handleClose } = props;

  const [formdata, setFormData] = React.useState(default_formdata);

  React.useEffect(() => {
    if (info.info !== null)
      setFormData(info.info);
  }, [info]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (info.action === 'add') {
      axios.post("http://192.168.140.37:5000" + '/api/lecture/add', formdata)
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
      axios.post("http://192.168.140.37:5000" + '/api/lecture/update', formdata)
        .then(res => {
          if (res.data.success === true) {
            Swal.fire({
              icon: "success",
              title: "",
              text: res.data.message,
            });
            handleClose(res.data.lecture);
            //window.location.reload();
            //navigate('/employee')
          }
        })
        .catch(err => console.log(err));
    }
  }

  const handleChangeDate = (value) => {
    setFormData({ ...formdata, lecture_date: value });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formdata, [event.target.id]: event.target.value });
  };

  function canBeSubmitted() {
    //console.log(formdata.type);
    //return formdata.type !== '' && formdata.brand !=='' && formdata.user !== '' && formdata.owner !=='';
    return formdata.brand !== '' && formdata.user !== '' && formdata.owner !== '';
  }

  return (
    // <React.Fragment>
    //   <BootstrapDialog
    //     onClose={handleClose}
    //     aria-labelledby="customized-dialog-title"
    //     open={info.open}
    //   >
    //     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    //       Lecture Information
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
    //       {/* <Card sx={{ minWidth: 300 }}>
    //     <CardContent> */}
    //       <div className="">
    //         <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit}>
    //           <div className="flex items-center" style={{ width: '400px' }}>
    //             <div className="flex-col">
    //               <label htmlFor="lecture_date" className="block text-sm/6 font-medium text-gray-900">Date</label>
    //             </div>
    //             <div className="flex-col ml-20">
    //               <DatePicker
    //                 dateFormat="yyyy/MM/dd"
    //                 selected={formdata.lecture_date}
    //                 onChange={handleChangeDate}
    //               />

    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <div className="flex-col" style={{ minWidth: '100px' }}>
    //               <label htmlFor="teacher" className="block text-sm/6 font-medium text-gray-900">Teacher</label>
    //             </div>
    //             <div className="flex-col w-full">
    //               <input type="text" onChange={handleChange} value={formdata.teacher} id="teacher" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='JuGwangMyong' />
    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <div className="flex-col" style={{ minWidth: '100px' }}>
    //               <label htmlFor="group" className="block text-sm/6 font-medium text-gray-900">Group</label>
    //             </div>
    //             <div className="flex-col w-full">
    //               <input type="text" onChange={handleChange} value={formdata.group} id="group" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='124' />
    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <div className="flex-col" style={{ minWidth: '100px' }}>
    //               <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Title</label>
    //             </div>
    //             <div className="flex-col w-full">
    //               <input type="text" onChange={handleChange} value={formdata.title} id="title" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='3' />
    //             </div>
    //           </div>

    //           <div>
    //             <div>
    //               <label htmlFor="desc" className="block text-sm/6 font-medium text-gray-900">Description</label>
    //             </div>
    //             <div className="mt-2">
    //               <input type="text" onChange={handleChange} value={formdata.desc} id="desc" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='3' />
    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <div className="flex-col" style={{ minWidth: '100px' }}>
    //               <label htmlFor="place" className="block text-sm/6 font-medium text-gray-900">Place</label>
    //             </div>
    //             <div className="flex-col w-full">
    //               <input type="text" onChange={handleChange} value={formdata.place} id="place" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='3' />
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //       {/* </CardContent>
    //       </Card> */}
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
        fullWidth
        maxWidth="sm" // Adjust max width as needed
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Lecture Information
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
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            {/** Date Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="lecture_date" className="block text-sm font-medium text-gray-900 sm:w-1/3">Date</label>
              <div className="mt-2 sm:mt-0 sm:w-2/3">
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={formdata.lecture_date}
                  onChange={handleChangeDate}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            </div>

            {/** Teacher Input */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="teacher" className="block text-sm font-medium text-gray-900 sm:w-1/3">Teacher</label>
              <input type="text" onChange={handleChange} value={formdata.teacher} id="teacher" required
                className="mt-2 sm:mt-0 sm:w-2/3 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder='JuGwangMyong'
              />
            </div>

            {/** Group Input */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="group" className="block text-sm font-medium text-gray-900 sm:w-1/3">Group</label>
              <input type="text" onChange={handleChange} value={formdata.group} id="group"
                className="mt-2 sm:mt-0 sm:w-2/3 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder='124'
              />
            </div>

            {/** Title Input */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 sm:w-1/3">Title</label>
              <input type="text" onChange={handleChange} value={formdata.title} id="title"
                className="mt-2 sm:mt-0 sm:w-2/3 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder='3'
              />
            </div>

            {/** Description Input */}
            <div className="flex flex-col">
              <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description</label>
              <input type="text" onChange={handleChange} value={formdata.desc} id="desc"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder='Enter description...'
              />
            </div>

            {/** Place Input */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="place" className="block text-sm font-medium text-gray-900 sm:w-1/3">Place</label>
              <input type="text" onChange={handleChange} value={formdata.place} id="place"
                className="mt-2 sm:mt-0 sm:w-2/3 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder='Location'
              />
            </div>
          </form>
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