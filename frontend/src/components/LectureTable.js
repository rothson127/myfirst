import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import EditIcon from '@mui/icons-material/Create';
// import DeleteForever from '@mui/icons-material/DeleteForever';
import axios from 'axios';
// import moment from 'moment';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import AuthServ from '../Auth';
import Swal from 'sweetalert2';

// function TablePaginationActions(props) {

//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

export default function LectureTable(props) {

  const isadmin = AuthServ.isAdmin();
  const { data, handleOpenEditDialog } = props;

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

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
        axios.post("http://192.168.140.37:5000" + '/api/lecture/remove', { _id: id })
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


    // if (window.confirm("Are you sure to remove this data?")){
    //   axios.post("http://192.168.140.37:5000" + '/api/lecture/remove', {_id:id})
    //       .then(res => {
    //         if(res.data.success === true) {
    //           alert(res.data.message);
    //           window.location.reload();
    //         }
    //       })
    //       .catch(err => console.log(err));
    // }
  }

  const columns = [
    {
      field: 'lecture_date', headerName: 'Date', flex: 1.5, valueFormatter: (params) => {
        // Format the date string to YYYY-MM-DD
        return new Date(params).toISOString().split('T')[0];
      }
    },
    { field: 'teacher', headerName: 'Teacher', minWidth: 100, flex: 1.5 },
    { field: 'group', headerName: 'Group', minwidth: 150, flex: 1 },
    { field: 'title', headerName: 'Title', minWidth: 100, flex: 2 },
    { field: 'desc', headerName: 'Description', flex: 3 },
    { field: 'place', headerName: 'NetKey UserName', flex: 1 },
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
            onClick={() => handleRemove(params.row._id)}
            style={{ marginLeft: 10 }}
          >
            Remove
          </Button>
        </div>
      ),
    } : {}
  ];

  // return (
  //   <TableContainer component={Paper}>
  //     <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Date</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Teacher</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Group</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Title</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Description</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Place</TableCell>

  //           {isadmin && (
  //             <>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Edit</TableCell>
  //           <TableCell sx={{fontWeight:"bold", fontSize:"17px"}}>Remove</TableCell>
  //           </>
  //           )}
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {(rowsPerPage > 0
  //           ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //           : data
  //         ).map((row) => (
  //           <TableRow key={row._id} >
  //             <TableCell style={{ width: 160 }}>
  //               {moment(row.lecture_date).format('yyyy/MM/DD')}
  //             </TableCell>
  //             <TableCell style={{ width: 100 }} >
  //               {row.teacher}
  //             </TableCell>
  //             <TableCell style={{ width: 100 }} >
  //               {row.group}
  //             </TableCell>
  //             <TableCell style={{ width: 100 }} >
  //               {row.title}
  //             </TableCell>
  //             <TableCell style={{ width: 300 }} >
  //               {row.desc}
  //             </TableCell>
  //             <TableCell style={{ width: 100 }} >
  //               {row.place}
  //             </TableCell>

  //             {isadmin && (
  //             <>
  //             <TableCell style={{ width: 50 }} >
  //               <IconButton onClick={()=>handleOpenEditDialog(row)}><EditIcon /></IconButton>
  //             </TableCell>
  //             <TableCell style={{ width: 50 }} >
  //               <IconButton onClick={()=>handleRemoveLecture(row)}><DeleteForever /></IconButton>
  //             </TableCell>
  //             </>
  //             )}
  //           </TableRow>
  //         ))}
  //         {emptyRows > 0 && (
  //           <TableRow style={{ height: 60 * emptyRows }}>
  //             <TableCell colSpan={20} />
  //           </TableRow>
  //         )}
  //       </TableBody>
  //       <TableFooter>
  //         <TableRow>
  //           <TablePagination
  //             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
  //             colSpan={13}
  //             count={data.length}
  //             rowsPerPage={rowsPerPage}
  //             page={page}
  //             slotProps={{
  //               select: {
  //                 inputProps: {
  //                   'aria-label': 'rows per page',
  //                 },
  //                 native: true,
  //               },
  //             }}
  //             onPageChange={handleChangePage}
  //             onRowsPerPageChange={handleChangeRowsPerPage}
  //             ActionsComponent={TablePaginationActions}
  //           />
  //         </TableRow>
  //       </TableFooter>
  //     </Table>
  //   </TableContainer>
  // );


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