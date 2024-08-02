import appwriteDbService from "../appwrite/database";
import { deleteTodo } from "../redux/todoSlice";

export const handleDeleteTodo = async ({
    id,
    status,
    dispatch,
    orderArrays,
}) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    }

    const isDeleted = await appwriteDbService.deleteTodo(id);

    if (isDeleted) {
        const orderData = orderArrays[status.toLowerCase()];
        const newTaskOrder = [...orderData];

        const index = newTaskOrder.indexOf(id);
        if (index !== -1) {
            newTaskOrder.splice(index, 1);
        }
        dispatch(
            deleteTodo({
                deletedTodo: { id, status },
                newTodoOrder: newTaskOrder,
            })
        );
    }
};
