import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import VocationTable from './VocationTable';
import VocationAddDlg from './VocationAddDlg';
import AuthServ from '../Auth';

const defaultDlgInfo = {
  open: false,
  action: 'add',
  info: null,
};

export default function VocationCard(props) {

  const [dlginfo, setDlgData] = React.useState(defaultDlgInfo);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.post("http://192.168.140.37:5000" + '/api/vocation/list')
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
          data[i].startdate = info.startdate;
          data[i].enddate = info.enddate;
          data[i].reason = info.reason;
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
          Vocations
        </Typography>
        <div className='flex justify-end mb-10'><Button variant="contained" onClick={handleClickOpen} ><AddIcon />Add</Button></div>

        <VocationTable data={data} handleOpenEditDialog={(info) => handleOpenEditDialog(info)} />
        <VocationAddDlg info={dlginfo} handleClose={(info) => handleClose(info)} />
      </CardContent>
    </Card>
  );
}