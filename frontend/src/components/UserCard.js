import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import UserTable from './UserTable';
import UserAddDlg from './UserAddDlg';

const default_dialogInfo = {
  open: false,
  action: 'add',
  info: null,
};

export default function UserListCard(props) {

  const [dlginfo, setDlgData] = React.useState(default_dialogInfo);

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://192.168.140.37:5000" + '/api/auth/getusers')
      .then(res => {
        setUsers(res.data.userList);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setDlgData({ info: null, open: true, action: 'add' });
  };

  const handleClose = (info) => {
    setDlgData({ info: null, open: false });
    if (dlginfo.action === 'edit' && info !== null) {
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === info._id) {
          users[i].userid = info.userid;
          users[i].username = info.username;
          users[i].birthday = info.birthday;
          users[i].unit = info.unit;
          users[i].group = info.group;
          users[i].netkey_username = info.netkey_username;
          users[i].netkey_machinename = info.netkey_machinename;
          users[i].isadmin = info.isadmin;
          break;
        }
      }
    }
  };

  const handleEditDlg = (info) => {
    setDlgData({ open: true, info: info, action: 'edit' });
  }

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Members
        </Typography>
        {/* <div className='flex justify-end mb-5'><Button variant="contained" onClick={handleClickOpen} ><AddIcon />Add</Button></div> */}
        <div className="mt-5">
          <UserTable users={users} handleOpenEditDialog={(info) => handleEditDlg(info)} />
        </div>
        <UserAddDlg info={dlginfo} handleClose={(info) => handleClose(info)} />
      </CardContent>
    </Card>
  );
}