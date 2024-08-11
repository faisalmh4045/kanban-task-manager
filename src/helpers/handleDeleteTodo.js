import appwriteDbService from "../appwrite/database";
import { deleteTodo } from "../redux/todoSlice";
import { toast } from "sonner";

const updateTodoOrder = (orderData, id) => {
    const newTaskOrder = [...orderData];

    const index = newTaskOrder.indexOf(id);
    if (index !== -1) {
        newTaskOrder.splice(index, 1);
    }

    return newTaskOrder;
};

export const handleDeleteTodo = async ({
    id,
    status,
    dispatch,
    orderArrays,
}) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    }

    const toastId = toast.loading("Deleting task...");

    try {
        const isDeleted = await appwriteDbService.deleteTodo(id);

        if (isDeleted) {
            const todoOrder = updateTodoOrder(orderArrays[status], id);

            dispatch(
                deleteTodo({
                    deletedTodo: { id, status },
                    newTodoOrder: todoOrder,
                })
            );

            toast.warning("Task deleted", {
                id: toastId,
            });
        }
    } catch (err) {
        toast.error("Something went wrong", {
            id: toastId,
        });
    }
};
