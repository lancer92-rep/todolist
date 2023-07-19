import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let temp = { id: state.todos.length, status: "todo", ...action.payload };
            state.todos.push( temp );
        },
        removeTodo: (state, action) => {
            console.log(action.payload)
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.todos.map((todo, i) => {
                todo.id = i
            })
        },
    },
});

export const { addTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;