import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material';
import CustomSelectEditor from './CustomSelectEditor';
import { removeTodo } from '@/src/reducers/todosSlice';


export default function TodoList() {
    const state = useSelector((state) => state.todos);
    const dispath = useDispatch();

    const removeRow = (id) => {
        return (e) => {
            console.log(id);
            dispath(removeTodo(id));
            e.preventDefault();
        }
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            valueGetter: (params) => params.id - 0 + 1
        },
        { field: 'title', headerName: 'Title', editable: true },
        {
            field: 'status',
            headerName: 'Status',
            editable: true,
            minWidth: 150,
            editable: true,
            renderEditCell: (params) => <CustomSelectEditor {...params} />,
        },
        {
            field: 'description',
            headerName: 'Description',
            editable: true,
        },
        {
            field: 'startdate',
            headerName: 'Start Date',
            type: 'date',
            editable: true,
            valueGetter: (params) => new Date(params.value)
        },
        {
            field: 'duedate',
            headerName: 'Due Date',
            type: 'date',
            minWidth: 200,
            editable: true,
            valueGetter: (params) => new Date(params.value) > new Date(params.row.startdate) ? new Date(params.value) : new Date(params.row.startdate)
        },
        { field: 'createdat', headerName: 'Created Date' },
        {
            field: 'operation',
            headerName: 'Operation',
            renderCell: (params) => <Button variant='outlined' color='error' size='large' onClick={removeRow(params.id)}>remove</Button>
        }
    ];

    return (
        <DataGrid
            rows={state.todos}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
    )
}
