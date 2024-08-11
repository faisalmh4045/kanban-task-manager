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

    const orderData = orderArrays[data.status];
    const order = calculateNewOrder(todos, orderData, orderData.length);

    try {
        const todo = await appwriteDbService.createTodo({
            ...data,
            order,
            userId,
        });

        const newOrderData = [...orderData, todo.$id];

        dispatch(
            addTodo({
                newTodo: todo,
                newTodoOrder: newOrderData,
            })
        );

        toast.success("Task created successfully", {
            id: toastId,
        });
    } catch (err) {
        toast.error("Something went wrong", {
            id: toastId,
        });
    }
};
