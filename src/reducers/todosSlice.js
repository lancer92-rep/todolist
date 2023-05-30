import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let temp = { id: Math.random(), status: "todo", ...action.payload };
            state.todos.push( temp );
        },
        editTodo: (state, action) => {
            state.todos = [...action.payload];
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
});

export const { addTodo, removeTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;