import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/modalSlice";

const TaskCard = ({ todo, handleDelete }) => {
    const dispatch = useDispatch();
    const date = new Date(todo.date).toDateString().substring(4, 11);

    return (
        <Card className="h-100">
            <Card.Header>
                <small className="text-muted">
                    {todo.priority} | {todo.status} | {date}
                </small>
            </Card.Header>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button
                    onClick={() => dispatch(openModal(todo))}
                    variant="primary"
                    size="sm"
                >
                    Edit
                </Button>
                <Button
                    onClick={() =>
                        handleDelete({ id: todo.$id, status: todo.status })
                    }
                    variant="danger"
                    size="sm"
                >
                    Delete
                </Button>
            </Card.Footer>
            <span>{todo.order}</span>
        </Card>
    );
};

export default TaskCard;
