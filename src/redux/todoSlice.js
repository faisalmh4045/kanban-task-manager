import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        deleteTodos: (state) => {
            state.todos = [];
        },
    },
});

export const { setTodos, deleteTodos } = todoSlice.actions;

export default todoSlice.reducer;
