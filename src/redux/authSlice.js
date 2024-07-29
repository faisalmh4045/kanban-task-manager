import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userSession: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;

            const userInfo = action.payload.currentUser;

            state.userSession = {
                userId: userInfo.$id,
                name: userInfo.name,
                email: userInfo.email,
                prefs: userInfo.prefs,
            };
        },
        logout: (state) => {
            state.status = false;
            state.userSession = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
