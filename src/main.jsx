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
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PrivateRoutes } from "./components";
import AllTasks from "./pages/AllTasks";
import Todos from "./pages/Todos";
import Doing from "./pages/Doing";
import ReviewTask from "./pages/ReviewTask";
import Completed from "./pages/Completed";
import Profile from "./pages/Profile";
import KanbanBoard from "./pages/KanbanBoard";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
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
