import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import DatePicker from 'react-datepicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import dayjs from 'dayjs';
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
  userid_id : '',
  userid: '',
  username: '',
  birthday: null,
  group: '',
  unit: '',
  netkey_username: '',
  netkey_machinename: '',
  type: 'Case',
  brand: '',
  spec: '',
  serial: '',
  user: '',
  owner: '',
  rb: '124',
  fault: '',
  reason: '',
  _id: null,
}

const eq_types = [
  {
    value: 'Case',
    label: 'Case',
  },
  {
    value: 'Case_Note',
    label: 'Case_Note',
  },
  {
    value: 'Display',
    label: 'Display',
  },
  {
    value: 'Hard(SSD)',
    label: 'Hard(SSD)',
  },
  {
    value: 'Hard(HDD)',
    label: 'Hard(HDD)',
  },
  {
    value: 'RAM',
    label: 'RAM',
  },
  {
    value: 'Keyboard',
    label: 'Keyboard',
  },
  {
    value: 'Mouse',
    label: 'Mouse',
  },

];

export default function MachineAddDlg(props) {
  const { dlgInfo, handleClose, users } = props;

  const [formdata, setFormData] = React.useState(defaultFormData);

  React.useEffect(() => {
    setFormData(defaultFormData);
    if (dlgInfo.info !== null) {
      setFormData({
        userid_id: dlgInfo.info.userid_id,
        userid: dlgInfo.info.userid_userid,
        username: dlgInfo.info.userid_username,
        birthday: dlgInfo.info.userid_birthday,
        group: dlgInfo.info.userid_group,
        unit: dlgInfo.info.userid_unit,
        netkey_username: dlgInfo.info.userid_netkey_username,
        netkey_machinename: dlgInfo.info.userid_netkey_machinename,
        type: dlgInfo.info.type,
        brand: dlgInfo.info.brand,
        spec: dlgInfo.info.spec,
        serial: dlgInfo.info.serial,
        user: dlgInfo.info.user,
        owner: dlgInfo.info.owner,
        rb: dlgInfo.info.rb,
        fault: dlgInfo.info.fault,
        reason: dlgInfo.info.reason,
        _id: dlgInfo.info._id,
      });
    }
  }, [dlgInfo]);



  const handleSubmit = (event) => {

    if (dlgInfo.action == 'add') {

      axios.post("http://192.168.140.37:5000" + '/api/machine/add', formdata)
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
      axios.post("http://192.168.140.37:5000" + '/api/machine/update', formdata)
        .then(res => {
          
          if (res.data.success === true) {
            Swal.fire({
              icon: "success",
              title: "",
              text: res.data.message,
            });
            handleClose(res.data.newmachine);
          }
        })
        .catch(err => console.log(err));
    }
  }

  const handleChangeBirthday = (value) => {
    setFormData({ ...formdata, birthday: value });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formdata, [event.target.id]: event.target.value });
  };

  const handleChangeUser = (event) => {
    event.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (users[i].userid === event.target.value) {
        setFormData({ ...formdata, userid_id: users[i]._id, userid: users[i].userid, username: users[i].username, birthday: users[i].birthday, unit: users[i].unit, netkey_username: users[i].netkey_username, netkey_machinename: users[i].netkey_machinename, group: users[i].group });
      }
    }
  }

  function canBeSubmitted() {
    //return formdata.type !== '' && formdata.brand !=='' && formdata.user !== '' && formdata.owner !=='';
    return formdata.brand !== '' && formdata.user !== '' && formdata.owner !== '';
  }

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={dlgInfo.open} maxWidth="xl">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Machine Information
          <IconButton aria-label="close" onClick={handleClose} sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form className="flex" action="#" method="POST" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* User Information Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                      User Information
                    </Typography>

                    <div className="mt-10">
                      <Grid container spacing={2}>
                        {/* Username Selection */}
                        <Grid item xs={12}>
                          <div></div>
                          <TextField
                            id="userid"
                            select
                            fullWidth
                            label="User ID"
                            slotProps={{
                              select: {
                                native: true,
                              },
                            }}
                            onChange={(e) => handleChangeUser(e)}
                            value={formdata.userid}
                          >
                            <option key='' value=''></option>
                            {users.map((option) => (
                              <option key={option.userid} value={option.userid}>
                                {option.username}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        {/* Birthday */}
                        <Grid item xs={12}>
                          <div className="flex items-center justify-between space-x-5">
                          <Typography variant="body2" sx={{ mb: 1 }}>Birthday</Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            className='w-full'
                              value={dayjs(formdata.birthday)}
                              // onChange={handleChangeBirthday} 
                              renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                          </LocalizationProvider>
                          </div>
                        </Grid>

                        {/* Unit and Group */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="unit"
                            label="Unit"
                            value={formdata.unit}
                            fullWidth
                          // onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="group"
                            label="Group"
                            value={formdata.group}
                            fullWidth
                          // onChange={(e) => handleChange(e)}
                          />
                        </Grid>

                        {/* NetKey User Name and Machine Name */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="netkey_username"
                            label="NetKey User Name"
                            value={formdata.netkey_username}
                            fullWidth
                          // onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="netkey_machinename"
                            label="NetKey Machine Name"
                            value={formdata.netkey_machinename}
                            fullWidth
                          // onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                      </Grid>

                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Machine Information Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                      Machine Information
                    </Typography>
                    <div className="mt-10">
                      <Grid container spacing={2}>
                        {/* Type Selection */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="type"
                            select
                            label="Type"
                            slotProps={{
                              select: {
                                native: true,
                              },
                            }}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                            value={formdata.type}
                          >
                            {eq_types.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        {/* Brand */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="brand"
                            label="Brand"
                            value={formdata.brand}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>

                        {/* Spec and Serial */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="spec"
                            label="Spec"
                            value={formdata.spec}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="serial"
                            label="Serial"
                            value={formdata.serial}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />

                        </Grid>


                        {/* User and Owner */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="user"
                            label="User"
                            value={formdata.user}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>

                        {/* Owner and RB */}
                        <Grid item xs={12} sm={6} container spacing={1}>
                          <Grid item xs={8}>
                            <TextField
                              id="owner"
                              label="Owner"
                              value={formdata.owner}
                              fullWidth
                              onChange={(e) => handleChange(e)}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="rb"
                              select
                              label="124/RB"
                              slotProps={{
                                select: {
                                  native: true,
                                },
                              }}
                              fullWidth
                              onChange={(e) => handleChange(e)}
                              value={formdata.rb}
                            >
                              {/* <option value="">Select</option>  */}
                              {/* Default empty option */}
                              <option value="124">124</option>
                              <option value="RB">RB</option>
                            </TextField>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="fault"
                            label="Fault"
                            value={formdata.fault}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="reason"
                            label="Reason"
                            value={formdata.reason}
                            fullWidth
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>

                      </Grid>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          {/* Add any actions you need here */}
          <Button autoFocus onClick={() => handleSubmit()} variant='contained' disabled={!canBeSubmitted()}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}