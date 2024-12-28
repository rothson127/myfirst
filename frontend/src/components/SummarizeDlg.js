import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        headerAlign: 'center',
        align: 'left',
    },
    {
        field: 'birthday',
        headerName: 'Birthday',
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        headerAlign: 'center',
        align: 'center',
    },
];

const rows = [
    { id: 1, name: 'John Doe', birthday: "2024-12-17T14:14:05.000Z", age: 35 },
    { id: 2, name: 'Jane Smith', birthday: "2023-06-25T10:30:00.000Z", age: 42 },
    { id: 3, name: 'Alice Johnson', birthday: "2022-01-01T00:00:00.000Z", age: 29 },
    { id: 4, name: 'Bob Brown', birthday: "1990-03-15T12:00:00.000Z", age: 34 },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function SummarizeDlg(props) {

    const summaryInfo = props.summaryInfo;
    
    return (

        <React.Fragment>
            <BootstrapDialog
                onClose={summaryInfo.handleClose}
                aria-labelledby="customized-dialog-title"
                open={summaryInfo.open}
                fullWidth
                maxWidth="sm" // Set a maximum width for the dialog
            >
                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                    Task Information
                    <IconButton
                        aria-label="close"
                        onClick={summaryInfo.handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ height: 400, width: '100%', '& .MuiDataGrid-root': { borderColor: '#ccc' } }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            autoHeight
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottomColor: '#e0e0e0',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#e3f2fd', // Light blue on hover
                                },
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus onClick={handleSubmit} variant='contained' color='primary' disabled={!canBeSubmitted()}>
                        Save
                    </Button> */}
                </DialogActions>
            </BootstrapDialog >
        </React.Fragment >
    );
}