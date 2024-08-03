import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/modalSlice";
import { useLocation } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TaskCard = ({ todo, handleDelete }) => {
    const loc = useLocation();
    const dispatch = useDispatch();
    const date = new Date(todo.date).toDateString().substring(4, 11);

    const priorityClass = `${todo.priority.toLowerCase()}-priority`;
    const statusClass = `${todo.status.toLowerCase()}-status`;

    return (
        <Card className="h-100">
            <Card.Header className="bg-white border-0 pt-3 pb-0">
                <span
                    className={`px-2 py-1 fw-bold rounded-2 ${priorityClass}`}
                >
                    <small>{todo.priority}</small>
                </span>{" "}
                {loc.pathname === "/all-tasks" && (
                    <span
                        className={`px-2 py-1 fw-bold rounded-2 ${statusClass}`}
                    >
                        <small>{todo.status}</small>
                    </span>
                )}
            </Card.Header>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text className="text-secondary">
                    {todo.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-0 pt-0">
                <div className="d-flex justify-content-between">
                    <span className="d-flex align-items-center text-secondary">
                        <IoCalendarClearOutline size={20} />
                        <span className="ms-1 text-black-50">{date}</span>
                    </span>
                    <div>
                        <Button
                            onClick={() => dispatch(openModal(todo))}
                            variant="warning"
                            className="border-0 edit-task-btn"
                            size="sm"
                        >
                            <FiEdit size={19} />
                        </Button>
                        <Button
                            onClick={() =>
                                handleDelete({
                                    id: todo.$id,
                                    status: todo.status,
                                })
                            }
                            variant="danger"
                            className="border-0 ms-1 delete-task-btn"
                            size="sm"
                        >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default TaskCard;
