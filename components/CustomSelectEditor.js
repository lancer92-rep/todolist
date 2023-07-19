import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';

function CustomSelectEditor(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = (e) => {
    const newValue = e.target.value; // The new value entered by the user
    apiRef.current.setEditCellValue({ id, field, value: newValue });
    e.preventDefault();
  };
  console.log("Edit", value);
  return (
    <Select fullWidth value={value} onChange={handleChange}>
      <MenuItem value="todo">todo</MenuItem>
      <MenuItem value="inprogress">inprogress</MenuItem>
      <MenuItem value="done">done</MenuItem>
    </Select>
  );
}

export default CustomSelectEditor;