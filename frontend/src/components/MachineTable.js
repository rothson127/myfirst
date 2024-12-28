import * as React from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import AuthServ from '../Auth';
import Swal from 'sweetalert2';

export default function MachineTable(props) {
  const isadmin = AuthServ.isAdmin();
  const { data, users, handleOpenEditDialog } = props;

  const handleRemoveMachine = (info) => {

    Swal.fire({
      title: "Are you sure to remove this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post("http://192.168.140.37:5000" + '/api/machine/remove', { _id: info._id })
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
  }

  const handleRemoveClick = async (row) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure remove this machine?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://192.168.140.37:5000" + '/api/machine/remove', { _id: row })
          .then(res => {
            if (res.data.success === true) {
              Swal.fire({
                icon: "success",
                title: "",
                text: res.data.message,
              });
              window.location.reload();
              //navigate('/employee')
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const columns = [
    {
      headerName: "User",
      field: "userid_username",
      flex: 1,
    },
    {
      headerName: "Birthday",
      field: "userid_birthday",
      flex: 1.2,
      valueFormatter: (params) => {
        // Format the date string to YYYY-MM-DD
        if (params) {
          return new Date(params).toISOString().split('T')[0];
        }
        return '';
      }
    },
    {
      headerName: "Unit",
      field: "userid_unit",
      flex: 1,
    },
    {
      headerName: "NetKey UserName",
      field: "userid_netkey_username",
      flex: 1.2,
    },
    {
      headerName: "NetKey MachineName",
      field: "userid_netkey_machinename",
      flex: 1.2,
    },
    {
      headerName: "Group",
      field: "userid_group",
      flex: 1,
    },
    {
      headerName: "Type",
      field: "type",
      flex: 1,
    },
    {
      headerName: "Brand",
      field: "brand",
      flex: 1,
    },
    {
      headerName: "Spec",
      field: "spec",
      flex: 1,
    },
    {
      headerName: "Serial",
      field: "serial",
      flex: 1.2,
    },
    {
      headerName: "User",
      field: "user",
      flex: 1,
    },
    {
      headerName: "Owner",
      field: "owner",
      flex: 1,
    },
    {
      headerName: "124/RB",
      field: "rb",
      flex: 1,
    },
    {
      headerName: "FaultStatus",
      field: "fault",
      flex: 1,
    },
    {
      headerName: "Reason",
      field: "reason",
      flex: 1,
    },
    isadmin ? {
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
            onClick={() => handleRemoveClick(params.row._id)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </Button>
        </div>
      ),
    } : {}
  ];


  return (
    <div cstyle={{ height: 300, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
    </div>
  );
}