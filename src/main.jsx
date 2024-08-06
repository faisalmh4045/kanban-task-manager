// import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import App from "./App";
import { PrivateRoutes } from "./components";
import {
    Homepage,
    Login,
    Signup,
    ForgotPassword,
    ResetPassword,
    KanbanBoard,
    AllTasks,
    Todos,
    Doing,
    ReviewTask,
    Completed,
    Profile,
} from "./pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<PrivateRoutes />}>
                <Route path="board" element={<KanbanBoard />} />
                <Route path="all-tasks" element={<AllTasks />} />
                <Route path="todos" element={<Todos />} />
                <Route path="doing" element={<Doing />} />
                <Route path="review" element={<ReviewTask />} />
                <Route path="completed" element={<Completed />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>
);
