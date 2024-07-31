import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import appwriteDbService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import { TaskForm } from "./index";

const TaskModal = (props) => {
    const todos = useSelector((state) => state.todoList.todos);
    const todo = useSelector((state) => state.modal.data);
    const { userId } = useSelector((state) => state.auth.userSession);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        props.onHide();

        try {
            if (todo) {
                const document = await appwriteDbService.updateTodo(todo.$id, {
                    ...data,
                });
                if (document) {
                    const updatedTodos = todos.map((todo) =>
                        todo.$id === document.$id ? document : todo
                    );
                    dispatch(setTodos(updatedTodos));
                }
            } else {
                const document = await appwriteDbService.createTodo({
                    ...data,
                    userId,
                });
                if (document) {
                    dispatch(setTodos([...todos, document]));
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskForm onSubmit={onSubmit} todo={todo} />
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
