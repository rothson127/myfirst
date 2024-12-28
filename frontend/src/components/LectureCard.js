import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import LectureTable from './LectureTable';
import LectureAddDlg from './LectureAddDlg';
import AuthServ from '../Auth';

const default_dialogInfo = {
  open:false,
  action:'add',
  info:null,
};

export default function LectureCard(props) {
  
   const [dlginfo, setDlgData] = React.useState(default_dialogInfo);

   const [data, setData] = React.useState([]);

    React.useEffect(()=> {
        axios.get("http://192.168.140.37:5000" + '/api/lecture/getlectures')
        .then(res => {
            setData(res.data.lectures);
        })
        .catch(err => console.log(err));
      }, [])
      
  const handleClickOpen = () => {
    setDlgData({info:null, open:true, action:'add'});
  };

  const handleClose = (info) => {
    setDlgData({info:null, open:false});
    
    if (dlginfo.action === 'edit' && info !== null){
      for (let i = 0; i < data.length; i ++){
        if (data[i]._id === info._id){
          data[i].lecture_date = info.lecture_date;
          data[i].teacher = info.teacher;
          data[i].group = info.group;
          data[i].desc = info.desc;
          data[i].place = info.place;
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
          Lectures
        </Typography>

        <div className='flex justify-end mb-10'><Button variant="contained" onClick={handleClickOpen} ><AddIcon/>Add</Button></div>
        <LectureTable data={data} handleOpenEditDialog={(info)=>handleOpenEditDialog(info)}/>
        <LectureAddDlg info={dlginfo} handleClose={(info)=>handleClose(info)} />
      </CardContent>
    </Card>
  );
}