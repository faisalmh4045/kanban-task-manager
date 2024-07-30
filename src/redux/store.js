import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        sidebar: sidebarSlice,
        filter: filterSlice,
    },
});

export default store;
