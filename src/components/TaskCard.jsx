import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TaskCard = ({ todo }) => {
    const loc = useLocation();
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

            <Card.Body className="pb-2">
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text className="text-body-secondary">
                    {todo.description}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="bg-white border-0 pt-0">
                <div className="d-flex justify-content-between">
                    <span className="d-flex align-items-center text-black-50">
                        <IoCalendarClearOutline size={19} />
                        <span className="ms-1">{date}</span>
                    </span>
                    <div data-id={todo.$id}>
                        <Button
                            variant="warning"
                            className="border-0 edit-task-btn"
                            size="sm"
                        >
                            <FiEdit size={17} className="pe-none" />
                        </Button>
                        <Button
                            variant="danger"
                            className="border-0 ms-1 delete-task-btn"
                            size="sm"
                        >
                            <AiOutlineDelete size={20} className="pe-none" />
                        </Button>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default TaskCard;
