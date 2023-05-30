import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGridPro,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';

import { useSelector, useDispatch } from 'react-redux';
import { editTodo } from '@/src/reducers/todosSlice';

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

export default function TodoList() {
  const state = useSelector((state) => state.todos);
  const rows = state.todos;
  const dispath = useDispatch();

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    let temp = [...rows];
    temp.splice(id,1);
    dispath(editTodo(temp));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id );
    if (editedRow.isNew) {
      // dispath(editTodo(rows.filter((row) => row.id !== id)));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    let s_date = new Date(updatedRow.startdate);
    let d_date = new Date(updatedRow.duedate);
    // if(s_date >= d_date) due;//d_date = s_date; 
    const data = {
      ...newRow, 
      startdate: s_date.toLocaleDateString(),
      duedate: d_date.toLocaleDateString(),
      createdat: new Date(updatedRow.createdat).toLocaleDateString(),
    }
    let temp = [...rows];
    temp[newRow.id] = data;
    dispath(editTodo(temp));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'title', headertitle: 'Title', minWidth: 80, editable: true },
    { field: 'description', headertitle: 'Description', editable: true },
    { 
      field: 'status', 
      headertitle: 'Status', 
      type: 'singleSelect', 
      valueOptions: ['todo', 'inprogress', 'done'], 
      editable: true 
    },
    {
        field: 'startdate',
        headerName: 'Start Date',
        type: 'date',
        editable: true,
        minWidth: 150,
        valueGetter: (params) => new Date(params.value)
    },
    {
        field: 'duedate',
        headerName: 'Due Date',
        type: 'date',
        minWidth: 150,
        editable: true,
        valueGetter: (params) => new Date(params.value),
        preProcessEditCellProps: (params) => {
          const hasError = new Date(params.props.value) < new Date(params.row.startdate);
          console.log(hasError);
          return { ...params.props, error: hasError };
        },    
    },
    { field: 'createdat', headerName: 'Created Date' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={1}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={2}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={3}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={4}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}