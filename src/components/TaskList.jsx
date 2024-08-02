import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "./index";
import { handleDeleteTodo } from "../helpers/handleDeleteTodo";

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

    return (
        <Row xs={1} md={2} lg={4} className="g-4">
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
    );
};

export default TaskList;
