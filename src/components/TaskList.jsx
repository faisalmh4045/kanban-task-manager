import { Col, Row } from "react-bootstrap";
import { TaskCard } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import appwriteDbService from "../appwrite/database";

const TaskList = ({ status }) => {
    const todos = useSelector((state) => state.todoList.todos);
    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    let filteredTodos = todos;
    if (filter !== "All") {
        filteredTodos = todos.filter((todo) => todo.priority === filter);
    }
    if (status !== "All") {
        filteredTodos = filteredTodos.filter((todo) => todo.status === status);
    }

    const handleDeleteTodo = async (todoId) => {
        try {
            await appwriteDbService.deleteTodo(todoId);
            const remainingTodos = todos.filter((todo) => todo.$id !== todoId);
            dispatch(setTodos(remainingTodos));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {filteredTodos.map((todo) => (
                <Col key={todo.$id}>
                    <TaskCard todo={todo} handleDelete={handleDeleteTodo} />
                </Col>
            ))}
        </Row>
    );
};

export default TaskList;
