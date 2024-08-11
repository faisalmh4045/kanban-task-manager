import appwriteDbService from "../appwrite/database";
import { updateTodo } from "../redux/todoSlice";
import { calculateNewOrder } from "./calculateNewOrder";
import { toast } from "sonner";

const updateTodoWithSameStatus = async (todo, data, dispatch) => {
    try {
        const document = await appwriteDbService.updateTodo(todo.$id, {
            ...data,
        });

        dispatch(
            updateTodo({
                updatedTodo: document,
            })
        );
    } catch (err) {
        console.error("Error updating task");
        throw err;
    }
};

const updateTodoWithDifferentStatus = async (
    todo,
    data,
    todos,
    orderArrays,
    dispatch
) => {
    const newTaskOrder = [...orderArrays[data.status]];
    const order = calculateNewOrder(todos, newTaskOrder, newTaskOrder.length);

    try {
        const document = await appwriteDbService.updateTodo(todo.$id, {
            ...data,
            order,
        });

        // delete from previous status
        const prevTaskOrder = [...orderArrays[todo.status]];
        const index = prevTaskOrder.indexOf(todo.$id);
        if (index !== -1) {
            prevTaskOrder.splice(index, 1);
        }

        // append to new status
        newTaskOrder.push(todo.$id);

        dispatch(
            updateTodo({
                updatedTodo: document,
                prevOrder: {
                    prevStatus: todo.status,
                    prevTaskOrder: prevTaskOrder,
                },
                newOrder: {
                    newStatus: data.status,
                    newTaskOrder: newTaskOrder,
                },
            })
        );
    } catch (err) {
        console.error("Error updating task");
        throw err;
    }
};

export const handleUpdateTodo = async (
    todo,
    data,
    todos,
    orderArrays,
    dispatch
) => {
    const toastId = toast.loading("Updating task...");

    const prevStatus = todo.status;
    const newStatus = data.status;

    try {
        if (prevStatus === newStatus) {
            await updateTodoWithSameStatus(todo, data, dispatch);
        } else {
            await updateTodoWithDifferentStatus(
                todo,
                data,
                todos,
                orderArrays,
                dispatch
            );
        }

        toast.success("Task updated", {
            id: toastId,
        });
    } catch (err) {
        toast.error("Something went wrong", {
            id: toastId,
        });
    }
};
