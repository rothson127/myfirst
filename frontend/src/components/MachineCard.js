import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import MachineTable from './MachineTable';
import AddIcon from '@mui/icons-material/Add';
import Summarize from '@mui/icons-material/Summarize'
import SaveIcon from '@mui/icons-material/Save';
import MachineAddDlg from './MachineAddDlg';
import SummarizeDlg from './SummarizeDlg';
import axios from 'axios';

import Swal from 'sweetalert2';



import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const defaultDlgInfo = {
  open: false,
  action: 'add',
  info: null,
};

const defaultSummaryInfo = {
  open: false,
  info: null,
}

export default function MachineCard(props) {

  const [dlginfo, setDlgInfo] = React.useState(defaultDlgInfo);
  const [summaryInfo, setSummaryInfo] = React.useState(defaultSummaryInfo);
  const [data, setData] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://192.168.140.37:5000" + '/api/machine/getmachines')
      .then(res => {
        setData(res.data.machines);
      })
      .catch(err => console.log(err));
      

    axios.get("http://192.168.140.37:5000" + '/api/auth/getusers')
      .then(res => {
        setUsers(res.data.userList);
      })
      .catch(err => console.log(err));
  }, [])


  const handleClickExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(dataBlob, "Machines.xlsx");

  };

  const handleClickSummarize = () => {
    
    console.log(JSON.stringify(data));
    let total = data.length;
    
    let fault = 0;
    for (let i = 0; i < total; i ++)
    {
      if (data[i].fault != null && data[i].fault != '')
        fault ++;
    }
    let normal = total- fault;
    Swal.fire({
      title: "<strong>Equipment Status Overview </strong>",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
    
    <div style="margin: 10px 0;" class="space-y-4">
        <div style="font-size: 24px; color: #d32f2f;">
            <strong>Breakdown:</strong> <span style="font-size: 32px;">${fault}</span>
        </div>
        <div style="font-size: 24px; color: #4caf50;">
            <strong>Normal:</strong> <span style="font-size: 32px;">${normal}</span>
        </div>
        <div style="font-size: 24px; color: #1976d2;">
            <strong>Total:</strong> <span style="font-size: 32px;">${total}</span>
        </div>
    </div>
</div>
      `,
      // showCloseButton: true,
      // showCancelButton: true,
      // focusConfirm: false,
      // confirmButtonText: `
      //   <i class="fa fa-thumbs-up"></i> Great!
      // `,
      // confirmButtonAriaLabel: "Thumbs up, great!",
      // cancelButtonText: `
      //   <i class="fa fa-thumbs-down"></i>
      // `,
      // cancelButtonAriaLabel: "Thumbs down"
    });
  }

  const handleCloseSummarize = () => {
    
    setSummaryInfo({info: null, open: false});
  }

  const handleClickOpen = () => {
    setDlgInfo({ info: null, open: true, action: 'add' });
  };

  const handleClose = (info) => {
    
    setDlgInfo({ info: null, open: false });
    if (dlginfo.action === 'edit' && info !== null) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === info._id) {
          data[i].type = info.type;
          data[i].brand = info.brand;
          data[i].spec = info.spec;
          data[i].serial = info.serial;
          data[i].user = info.user;
          data[i].owner = info.owner;
          data[i].rb = info.rb;
          data[i].fault = info.fault;
          data[i].reason = info.reason;
          data[i].userid_id = info.userid._id;
          data[i].userid_userid = info.userid.userid;
          data[i].userid_username = info.userid.username;
          data[i].userid_birthday = info.userid.birthday;
          data[i].userid_unit = info.userid.unit;
          data[i].userid_netkey_username = info.userid.netkey_username;
          data[i].userid_netkey_machinename = info.userid.netkey_machinename;
          data[i].userid_group = info.userid.group;
          
          break;
        }
      }
    }

  };

  const handleOpenEditDialog = (info) => {
    setDlgInfo({ open: true, info: info, action: 'edit' });
  }

  return (
    <Card sx={{ minWidth: 300 }} >
      <CardContent>
        <Typography variant="h5" component="div">
          Machines
        </Typography>
        <div className='flex justify-end mb-5 space-x-3'>
          {/* {AuthServ.isAdmin() &&
            (<Button variant="contained" onClick={handleClickOpen} ><AddIcon />Add</Button>)} */}
          <Button variant="contained" onClick={handleClickSummarize} ><Summarize />Overview</Button>
          
          <Button variant="contained" onClick={handleClickOpen} ><AddIcon />Add</Button>
          <Button variant="contained" onClick={handleClickExport} ><SaveIcon />Export</Button></div>
        <MachineTable data={data} users={users} handleOpenEditDialog={(info) => handleOpenEditDialog(info)} />
        <MachineAddDlg dlgInfo={dlginfo} handleClose={(info) => handleClose(info)} users={users} />
        <SummarizeDlg summaryInfo={summaryInfo} handleClose={(info) => handleCloseSummarize(info)}/>
      </CardContent>
    </Card>
  );
}