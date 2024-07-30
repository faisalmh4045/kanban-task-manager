import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";

const Topbar = () => {
    const dispatch = useDispatch();

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div>
            <button
                className="btn btn-secondary"
                type="button"
                onClick={handleToggleSidebar}
            >
                Toggle sidebar
            </button>
        </div>
    );
};

export default Topbar;
