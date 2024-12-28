import * as React from 'react';

import AuthServ from '../Auth';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import Swal from 'sweetalert2'

export default function TaskTable(props) {

  const isadmin = AuthServ.isAdmin();

  const { data, handleOpenEditDialog } = props;

  const handleRemove = (id) => {

    Swal.fire({
      title: "Are you sure to remove this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://192.168.140.37:5000" + '/api/task/remove', { _id: id })
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

    // if (window.confirm("Are you sure to remove this data?")) {
    //   axios.post("http://192.168.140.37:5000" + '/api/task/remove', { _id: id })
    //     .then(res => {
    //       if (res.data.success === true) {
    //         alert(res.data.message);
    //         window.location.reload();
    //       }
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  const columns = [
    { field: 'username', headerName: 'UserName', flex: 1 },
    { field: 'project', headerName: 'Project', flex: 1 },
    { field: 'stack', headerName: 'Stack', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'url', headerName: 'Url', flex: 1 },
    {
      field: 'startdate', headerName: 'StartDate', flex: 1, valueFormatter: (params) => {
        // Format the date string to YYYY-MM-DD
        return new Date(params).toISOString().split('T')[0];
      }
    },
    {
      field: 'enddate', headerName: 'EndDate', flex: 1, valueFormatter: (params) => {
        // Format the date string to YYYY-MM-DD
        return new Date(params).toISOString().split('T')[0];
      }
    },
    (isadmin ? {
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
    } : {})
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