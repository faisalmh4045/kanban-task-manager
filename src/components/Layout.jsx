import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            Sidebar
            <Outlet />
        </div>
    );
};

export default Layout;
