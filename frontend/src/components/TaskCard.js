import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import TaskTable from './TaskTable';
import TaskAddDlg from './TaskAddDlg';
import AuthServ from '../Auth';

const defaultDlgInfo = {
  open: false,
  action: 'add',
  info: null,
};

export default function TaskCard(props) {

  const [dlginfo, setDlgData] = React.useState(defaultDlgInfo);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.post("http://192.168.140.37:5000" + '/api/task/list')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleClickOpen = () => {
    setDlgData({ info: null, open: true, action:'add' });
  };

  const handleClose = (info) => {
    setDlgData({ info: null, open: false });
    if (dlginfo.action === 'edit' && info !== null){
      for (let i = 0; i < data.length; i ++){
        if (data[i]._id === info._id){
          data[i].username = info.username;
          data[i].project = info.project;
          data[i].stack = info.stack;
          data[i].price = info.price;
          data[i].description = info.description;
          data[i].url = info.url;
          data[i].startdate = info.startdate;
          data[i].enddate = info.enddate;
          break;
        }
      }
    }

  };


  const handleOpenEditDialog = (info)=>{
    setDlgData({open:true, info:info, action:'edit'});
  }

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Tasks
        </Typography>
        <div className='flex justify-end mb-10'><Button variant="contained" onClick={handleClickOpen} ><AddIcon />Add</Button></div>

        <TaskTable data={data} handleOpenEditDialog={(info) => handleOpenEditDialog(info)} />
        <TaskAddDlg info={dlginfo} handleClose={(info) => handleClose(info)} />
      </CardContent>
    </Card>
  );
}