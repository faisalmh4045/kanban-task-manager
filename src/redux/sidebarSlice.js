import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: window.innerWidth > 576,
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true;
        },
        closeSidebar: (state) => {
            state.isOpen = false;
        },
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openSidebar, closeSidebar, toggleSidebar } =
    sidebarSlice.actions;

export default sidebarSlice.reducer;
