import { NavLink } from "react-router-dom";

const NavItem = ({ item }) => {
    return (
        <NavLink
            to={`${item.path}`}
            className={({ isActive }) => {
                return `d-block px-3 py-2 my-2 text-decoration-none text-dark rounded rounded-3 ${
                    isActive ? "sidebar-active-link" : ""
                }`;
            }}
        >
            <span>{item.icon}</span>
            <span className="ms-3">{item.name}</span>
        </NavLink>
    );
};

export default NavItem;
