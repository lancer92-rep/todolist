import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/src/reducers/todosSlice';
import { useState } from 'react';

export default function AddTodo() {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ startdate, setStartdate ] = useState('');
  const [ duedate, setDuedate ] = useState('');
  const [ error, setError ] = useState({});

  const dispath = useDispatch();

  const onAdd = () => {
    setError({
      title: title=='' ? true : false,
      description: description=='' ? true : false,
      startdate: startdate=='' ? true : false,
      duedate: duedate=='' ? true : false
    })
    if(title == '' || description == '' || startdate == '' || duedate == '') return;
    const data = {
      title: title,
      description: description,
      startdate: startdate,
      duedate: duedate,
      createdat: new Date().toLocaleDateString()
    }
    dispath(addTodo(data));
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        error={error.title}
        id="title"
        label="Outlined"
        variant="outlined" 
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
        onChange={ e => setTitle(e.target.value) }
      />
      <TextField 
        required 
        error={error.description}
        id="description" 
        label="description" 
        variant="outlined" 
        InputLabelProps={{
          shrink: true,
        }}
        value={description}
        onChange={ e => setDescription(e.target.value) }
      />
      <TextField
        required 
        error={error.startdate}
        id="startdate" 
        label="Start Date" 
        type='date' 
        variant="outlined" 
        InputLabelProps={{
          shrink: true,
        }}
        value={startdate}
        onChange={ e => setStartdate(e.target.value) }
      />
      <TextField 
        required 
        error={error.duedate}
        id="duedate" 
        type='date' 
        label="Due Date" 
        variant="outlined" 
        InputLabelProps={{
          shrink: true,
        }}
        value={duedate}
        onChange={ e => setDuedate(e.target.value) }
      />
      <Button
        variant="outlined"
        size='large'
        onClick={onAdd}
      >
        Add Todo
      </Button>
    </Box>
  );
}