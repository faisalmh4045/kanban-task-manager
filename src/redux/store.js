import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";
import filterSlice from "./filterSlice";
import modalSlice from "./modalSlice";
import todoSlice from "./todoSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        sidebar: sidebarSlice,
        filter: filterSlice,
        modal: modalSlice,
        todoList: todoSlice,
    },
});

export default store;
