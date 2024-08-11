import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: {},
    orderArrays: {},
};

export const todoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            const todos = action.payload;

            const todoMap = {};
            const statusCategories = {
                Todo: [],
                Doing: [],
                Review: [],
                Completed: [],
            };

            todos.forEach((todo) => {
                todoMap[todo.$id] = todo;
                statusCategories[todo.status].push(todo.$id);
            });

            state.todos = todoMap;
            state.orderArrays = statusCategories;
        },

        addTodo: (state, action) => {
            const { newTodo, newTodoOrder } = action.payload;

            state.todos[newTodo.$id] = newTodo;
            state.orderArrays[newTodo.status] = newTodoOrder;
        },

        updateTodo: (state, action) => {
            const { updatedTodo, prevOrder, newOrder } = action.payload;

            if (updatedTodo) state.todos[updatedTodo.$id] = updatedTodo;

            if (prevOrder) {
                const { prevStatus, prevTaskOrder } = prevOrder;
                state.orderArrays[prevStatus] = prevTaskOrder;
            }

            if (newOrder) {
                const { newStatus, newTaskOrder } = newOrder;
                state.orderArrays[newStatus] = newTaskOrder;
            }
        },

        deleteTodo: (state, action) => {
            const { deletedTodo, newTodoOrder } = action.payload;

            delete state.todos[deletedTodo.id];
            state.orderArrays[deletedTodo.status] = newTodoOrder;
        },

        deleteTodos: (state) => {
            state.todos = {};
            state.orderArrays = {};
        },
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, deleteTodos } =
    todoSlice.actions;

export default todoSlice.reducer;
