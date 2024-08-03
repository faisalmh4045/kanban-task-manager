import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "./index";
import { handleDeleteTodo } from "../helpers/handleDeleteTodo";

const TaskList = ({ status }) => {
    const todos = useSelector((state) => state.todoList.todos);
    const orderArrays = useSelector((state) => state.todoList.orderArrays);
    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    let filteredTodos = todos ? Object.values(todos) : [];
    if (filteredTodos.length === 0)
        return <div className="text-center my-4">Tap + to add tasks.</div>;

    if (filter !== "All") {
        filteredTodos = filteredTodos.filter(
            (todo) => todo.priority === filter
        );
    }
    if (status !== "All") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === status);
    }

    return (
        <Container className="mb-4">
            <Row xs={1} md={2} lg={3} xl={4} className="g-3 g-lg-4">
                {filteredTodos.reverse().map((todo) => (
                    <Col key={todo.$id}>
                        <TaskCard
                            todo={todo}
                            handleDelete={({ id, status }) =>
                                handleDeleteTodo({
                                    id,
                                    status,
                                    dispatch,
                                    orderArrays,
                                })
                            }
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TaskList;
