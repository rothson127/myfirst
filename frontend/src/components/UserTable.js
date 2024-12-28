import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';

// import EditIcon from '@mui/icons-material/Create';
// import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';
// import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import Swal from 'sweetalert2';
// import AuthServ from '../Auth';

export default function UserTable(props) {

  const { users, handleOpenEditDialog } = props;

  const columns = [
    { field: 'userid', headerName: 'User ID', width: 100 },
    { field: 'username', headerName: 'UserName', minWidth: 100, flex: 1 },
    {
      field: 'birthday', headerName: 'Birthday', minwidth: 150, flex: 1.5, valueFormatter: (params) => {
        // Format the date string to YYYY-MM-DD
        return new Date(params).toISOString().split('T')[0];
      }
    },
    { field: 'unit', headerName: 'Unit', minWidth: 100, flex: 1 },
    { field: 'group', headerName: 'Group', flex: 1 },
    { field: 'netkey_username', headerName: 'NetKey UserName', flex: 2 },
    { field: 'netkey_machinename', headerName: 'NetKey MachineName', flex: 2 },
    { field: 'isadmin', headerName: 'Admin', type: 'boolean', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenEditDialog(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemove(params.row._id)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </Button>
        </div>
      ),
    }
  ];

  const handleRemove = (_id) => {

    Swal.fire({
      title: "Are you sure to remove this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://192.168.140.37:5000" + '/api/auth/remove', { _id: _id })
          .then(res => {
            if (res.data.success === true) {
              Swal.fire({
                title: "Deleted!",
                text: res.data.message,
                icon: "success"
              });
              window.location.reload();
            }
          })
          .catch(err => console.log(err));
      }
    });

    // if (window.confirm("Are you sure to remove this member?")) {
    //   axios.post("http://192.168.140.37:5000" + '/api/auth/remove', { _id: _id })
    //     .then(res => {
    //       alert(res.data.message);
    //       if (res.data.success === true) {

    //         window.location.reload();
    //       }
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  return (
    <div cstyle={{ height: 300, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
      />
    </div>
  );
}