import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "./index";
import { handleTaskCardAction } from "../helpers";

const TaskList = ({ status }) => {
    const todos = useSelector((state) => state.todoList.todos);
    const orderArrays = useSelector((state) => state.todoList.orderArrays);
    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    let filteredTodos = todos ? Object.values(todos) : [];

    if (filter !== "All") {
        filteredTodos = filteredTodos.filter(
            (todo) => todo.priority === filter
        );
    }
    if (status !== "All") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === status);
    }

    const handleTaskAction = (evt) => {
        handleTaskCardAction(evt, todos, dispatch, orderArrays);
    };

    return (
        <Container className="mb-4" onClick={handleTaskAction}>
            {filteredTodos.length === 0 ? (
                <div className="text-center my-5 ">
                    <span className="p-2 rounded bg-body-secondary">
                        Tap + to add tasks.
                    </span>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-3 g-lg-4">
                    {filteredTodos.reverse().map((todo) => (
                        <Col key={todo.$id}>
                            <TaskCard todo={todo} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default TaskList;
