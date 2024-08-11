import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modalSlice";

const ColumnHeader = ({ columnTitle, taskCount }) => {
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        dispatch(openModal({ status: columnTitle }));
    };

    return (
        <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
                <span className="fs-5">{columnTitle}</span>
                <span className="ms-2 px-1 py-0 rounded-2 kanban-column-task-count">
                    {taskCount}
                </span>
            </div>
            <button onClick={() => handleAddTodo(columnTitle)} className="btn">
                <FiPlus size={20} />
            </button>
        </div>
    );
};

export default ColumnHeader;
