import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../redux/authSlice";
import { Button } from "react-bootstrap";
import { closeSidebar } from "../redux/sidebarSlice";
import { deleteTodos } from "../redux/todoSlice";
import { PiAlignTopLight } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { BsListTask } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { GrRedo } from "react-icons/gr";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";

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

    const iconSize = 22;

    const navItems = [
        {
            name: "Boards",
            path: "/board",
            icon: <PiAlignTopLight size={iconSize} />,
        },
        {
            name: "All Tasks",
            path: "/all-tasks",
            icon: <GoHome size={iconSize} />,
        },
        {
            name: "Todos",
            path: "/todos",
            icon: <BsListTask size={iconSize} />,
        },
        {
            name: "Doing",
            path: "/doing",
            icon: <TbProgress size={iconSize} />,
        },
        {
            name: "Need Review",
            path: "/review",
            icon: <GrRedo size={iconSize} />,
        },
        {
            name: "Completed",
            path: "/completed",
            icon: <MdOutlineTaskAlt size={iconSize} />,
        },
    ];

    return (
        <>
            <section
                className={`${
                    isopen ? "sidebar-expand" : "sidebar-collapse"
                } sidebar d-flex flex-column justify-content-between position-fixed top-0 start-0 bg-white z-3 p-3 overflow-auto border-end`}
            >
                <div>
                    <div className="d-flex align-items-center p-2 rounded mb-5">
                        <div className="w-25 ratio ratio-1x1">
                            <img
                                className="p-1 rounded-circle"
                                src="/default-avatar.png"
                                alt="profile picture"
                            />
                        </div>
                        <div>
                            <span className="ms-2 fs-5">{name}</span>
                            <br />
                            <small className="ms-2 text-muted">{email}</small>
                        </div>
                    </div>

                    <ul className="list-unstyled">
                        {navItems.map((item, id) => (
                            <NavLink
                                key={id}
                                to={`${item.path}`}
                                className={({ isActive }) => {
                                    return `d-block px-3 py-2 my-2 text-decoration-none text-dark rounded rounded-3 ${
                                        isActive ? "sidebar-active-link" : ""
                                    }`;
                                }}
                            >
                                <div>
                                    <span>{item.icon}</span>
                                    <span className="ms-3">{item.name}</span>
                                </div>
                            </NavLink>
                        ))}
                    </ul>
                </div>

                <div className="ms-3 mb-3">
                    <Button
                        className="d-flex align-items-center border-0 sidebar-signout-btn"
                        variant="secondary"
                        size="sm"
                        onClick={logoutHandler}
                    >
                        <BiLogOutCircle size={17} />
                        <span className="ms-1">Sign Out</span>
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
