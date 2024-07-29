import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";

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

    return loading ? <div>loading</div> : <Outlet />;
}

export default App;
