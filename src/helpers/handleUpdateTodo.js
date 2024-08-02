import appwriteDbService from "../appwrite/database";
import { updateTodo } from "../redux/todoSlice";
import { calculateNewOrder } from "./calculateNewOrder";

export const handleUpdateTodo = async (
    todo,
    data,
    todos,
    orderArrays,
    dispatch
) => {
    const prevStatus = todo.status.toLowerCase();
    const newStatus = data.status.toLowerCase();

    if (prevStatus === newStatus) {
        const document = await appwriteDbService.updateTodo(todo.$id, {
            ...data,
        });
        if (document) {
            dispatch(
                updateTodo({
                    updatedTodo: document,
                })
            );
        }
    } else {
        const newTaskOrder = [...orderArrays[newStatus]];
        const order = calculateNewOrder(
            todos,
            newTaskOrder,
            newTaskOrder.length
        );

        const document = await appwriteDbService.updateTodo(todo.$id, {
            ...data,
            order,
        });

        // delete from src
        const prevTaskOrder = [...orderArrays[prevStatus]];
        const index = prevTaskOrder.indexOf(todo.$id);
        if (index !== -1) {
            prevTaskOrder.splice(index, 1);
        }

        // append to dest
        newTaskOrder.push(todo.$id);

        if (document) {
            dispatch(
                updateTodo({
                    updatedTodo: document,
                    prevOrder: {
                        prevStatus: prevStatus,
                        prevTaskOrder: prevTaskOrder,
                    },
                    newOrder: {
                        newStatus: newStatus,
                        newTaskOrder: newTaskOrder,
                    },
                })
            );
        }
    }
};
