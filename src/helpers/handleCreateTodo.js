import appwriteDbService from "../appwrite/database";
import { addTodo } from "../redux/todoSlice";
import { calculateNewOrder } from "./calculateNewOrder";

export const handleCreateTodo = async (
    data,
    userId,
    todos,
    orderArrays,
    dispatch
) => {
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
    }
};
