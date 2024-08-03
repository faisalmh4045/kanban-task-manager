import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { useLocation } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { FilterDropdown } from "./index";
import { openModal } from "../redux/modalSlice";
import { LuAlignJustify, LuPlusCircle } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

const Topbar = () => {
    const dispatch = useDispatch();
    const loc = useLocation();

    const pathToTitleMap = {
        "/board": "Boards",
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
        <Container fluid className="sticky-top z-1 pt-1">
            <div className="d-flex justify-content-between p-2 bg-white shadow-sm rounded mb-3 border">
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-secondary bg-white border-0 p-1"
                        type="button"
                        onClick={handleToggleSidebar}
                    >
                        <LuAlignJustify size={25} color="gray" />
                    </button>
                    <span className="ms-2 fs-5">
                        {pathToTitleMap[loc.pathname]}
                    </span>
                </div>
                <div className="d-flex">
                    <FilterDropdown />
                    <Button
                        className="ms-2 create-task-btn"
                        variant="secondary"
                        onClick={() => dispatch(openModal(null))}
                    >
                        <div className="d-flex align-items-center">
                            <FiPlus size={20} className="d-sm-none" />
                            <LuPlusCircle className="d-none d-sm-inline" />
                            <span className="ms-1 d-none d-sm-inline">
                                Task
                            </span>
                        </div>
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Topbar;
