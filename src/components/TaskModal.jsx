import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { TaskForm } from "./index";
import { handleCreateTodo, handleUpdateTodo } from "../helpers";

const TaskModal = (props) => {
    const todos = useSelector((state) => state.todoList.todos);
    const orderArrays = useSelector((state) => state.todoList.orderArrays);
    const todo = useSelector((state) => state.modal.data);
    const { userId } = useSelector((state) => state.auth.userSession);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        props.onHide();
        try {
            if (todo?.$id) {
                await handleUpdateTodo(
                    todo,
                    data,
                    todos,
                    orderArrays,
                    dispatch
                );
            } else {
                await handleCreateTodo(
                    data,
                    userId,
                    todos,
                    orderArrays,
                    dispatch
                );
            }
        } catch (err) {
            console.log(err);
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
