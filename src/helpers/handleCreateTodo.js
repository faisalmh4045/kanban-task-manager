import appwriteDbService from "../appwrite/database";
import { addTodo } from "../redux/todoSlice";
import { calculateNewOrder } from "./calculateNewOrder";
import { toast } from "sonner";

export const handleCreateTodo = async (
    data,
    userId,
    todos,
    orderArrays,
    dispatch
) => {
    const toastId = toast.loading("Creating new task...");

    const orderData = orderArrays[data.status.toLowerCase()];
    const order = calculateNewOrder(todos, orderData, orderData.length);

    const document = await appwriteDbService.createTodo({
        ...data,
        order,
        userId,
    });

    if (document) {
        const newOrderData = [...orderData, document.$id];

        dispatch(
            addTodo({
                newTodo: document,
                newTodoOrder: newOrderData,
            })
        );

        toast.success("Task created successfully", {
            id: toastId,
        });
    } else {
        toast.error("Something went wrong", {
            id: toastId,
        });
    }
};
