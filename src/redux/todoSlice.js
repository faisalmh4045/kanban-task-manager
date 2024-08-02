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
            todos.forEach((todo) => {
                todoMap[todo.$id] = todo;
            });

            state.todos = todoMap;

            const statusCategories = {
                todo: [],
                doing: [],
                review: [],
                completed: [],
            };

            todos.forEach((todo) => {
                if (todo.status.toLowerCase() in statusCategories) {
                    statusCategories[todo.status.toLowerCase()].push(todo.$id);
                }
            });

            state.orderArrays = statusCategories;
        },

        addTodo: (state, action) => {
            const { newTodo, newTodoOrder } = action.payload;

            state.todos[newTodo.$id] = newTodo;
            state.orderArrays[newTodo.status.toLowerCase()] = newTodoOrder;
        },

        updateTodo: (state, action) => {
            const { updatedTodo, prevOrder, newOrder } = action.payload;

            if (updatedTodo) state.todos[updatedTodo.$id] = updatedTodo;

            if (prevOrder && newOrder) {
                const { prevStatus, prevTaskOrder } = prevOrder;
                state.orderArrays[prevStatus.toLowerCase()] = prevTaskOrder;

                const { newStatus, newTaskOrder } = newOrder;
                state.orderArrays[newStatus.toLowerCase()] = newTaskOrder;
            } else if (prevOrder) {
                const { prevStatus, prevTaskOrder } = prevOrder;
                state.orderArrays[prevStatus.toLowerCase()] = prevTaskOrder;
            }
        },

        deleteTodo: (state, action) => {
            const { deletedTodo, newTodoOrder } = action.payload;

            delete state.todos[deletedTodo.id];
            state.orderArrays[deletedTodo.status.toLowerCase()] = newTodoOrder;
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
