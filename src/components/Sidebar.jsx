import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../redux/authSlice";
import { Button } from "react-bootstrap";
import { closeSidebar } from "../redux/sidebarSlice";
import { deleteTodos } from "../redux/todoSlice";

const Sidebar = () => {
    const { name, email } = useSelector((state) => state.auth.userSession);
    const isopen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(deleteTodos());
        });
    };

    const navItems = [
        {
            name: "All Tasks",
            path: "/all-tasks",
        },
        {
            name: "Todos",
            path: "/todos",
        },
        {
            name: "Doing",
            path: "/doing",
        },
        {
            name: "Need Review",
            path: "/review",
        },
        {
            name: "Completed",
            path: "/completed",
        },
    ];

    return (
        <>
            <section
                className={`${
                    isopen ? "sidebar-expand" : "sidebar-collapse"
                } sidebar d-flex flex-column justify-content-between position-fixed top-0 start-0 bg-white z-3 p-2`}
            >
                <div>
                    <div className="d-flex align-items-center border p-2 rounded bg-primary-subtle mb-5">
                        <img
                            className="img-fluid w-25 rounded-circle"
                            src="/default-avatar.png"
                            alt="profile picture"
                        />
                        <div>
                            <span className="ms-2 fs-5">{name}</span>
                            <br />
                            <span className="ms-2 fs-6">{email}</span>
                        </div>
                    </div>

                    <ul className="list-unstyled">
                        {navItems.map((item, id) => (
                            <NavLink
                                key={id}
                                to={`${item.path}`}
                                className={({ isActive }) => {
                                    return `d-block p-2 my-2 border text-decoration-none rounded ${
                                        isActive
                                            ? "text-dark fw-bold"
                                            : "text-dark"
                                    }`;
                                }}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </ul>
                </div>

                <div className="text-center d-grid">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={logoutHandler}
                    >
                        Sign Out
                    </Button>
                </div>
            </section>
            <div
                className={`z-3 ${isopen ? "sidebar-close-overlay" : ""}`}
                onClick={() => dispatch(closeSidebar())}
            ></div>
        </>
    );
};

export default Sidebar;
