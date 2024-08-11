import { openModal } from "../redux/modalSlice";
import { handleDeleteTodo } from "./handleDeleteTodo";

export const handleTaskCardAction = (evt, todos, dispatch, orderArrays) => {
    const { id } = evt.target.parentNode.dataset;
    if (!id) return;

    const targetClassList = evt.target.classList;
    const todo = todos[id];

    if (targetClassList.contains("edit-task-btn")) {
        dispatch(openModal(todo));
    } else if (targetClassList.contains("delete-task-btn")) {
        handleDeleteTodo({ id, status: todo.status, dispatch, orderArrays });
    }
};
