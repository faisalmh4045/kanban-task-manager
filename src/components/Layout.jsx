import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "./index";
import { useSelector } from "react-redux";

const Layout = () => {
    const isopen = useSelector((state) => state.sidebar.isOpen);

    return (
        <div className="d-flex w-100">
            <Sidebar />
            <div
                className={`${
                    isopen ? "expanded-sidebar" : ""
                } main-container position-absolute top-0 end-0 min-vh-100 p-4`}
            >
                <Topbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
