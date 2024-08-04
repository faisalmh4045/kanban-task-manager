import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Toaster } from "sonner";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login({ currentUser }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("App :: checkUserSession :: error", error);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, [dispatch]);

    return loading ? (
        <div className="loading-wrapper d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    ) : (
        <>
            <Toaster offset="50px" richColors />
            <Outlet />
        </>
    );
}

export default App;
