import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FilterDropdown } from "./index";
import { openModal } from "../redux/modalSlice";

const Topbar = () => {
    const dispatch = useDispatch();
    const loc = useLocation();

    const pathToTitleMap = {
        "/all-tasks": "All Tasks",
        "/todos": "Todos",
        "/doing": "Doing",
        "/review": "Review",
        "/completed": "Completed",
        "/profile": "Profile",
    };

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div className="d-flex justify-content-between bg-white p-2 shadow-sm mb-3 rounded">
            <div>
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleToggleSidebar}
                >
                    Toggle sidebar
                </button>
                <span className="ms-3 fs-5">
                    {pathToTitleMap[loc.pathname]}
                </span>
            </div>
            <div className="d-flex">
                <FilterDropdown />
                <Button
                    className="ms-2"
                    variant="secondary"
                    onClick={() => dispatch(openModal(null))}
                >
                    New Task
                </Button>
            </div>
        </div>
    );
};

export default Topbar;
