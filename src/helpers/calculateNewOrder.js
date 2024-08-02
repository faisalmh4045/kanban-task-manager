export const calculateNewOrder = (todos, orderData, destinationIndex) => {
    if (destinationIndex === 0) {
        if (orderData.length === 0) return 100;

        const destTaskId = orderData[destinationIndex];
        const destTask = todos[destTaskId];
        if (destTask.order !== 1) return Math.floor(destTask.order / 2);
        else return null;
    } else if (destinationIndex === orderData.length) {
        const lastTodo = todos[orderData.at(-1)];
        return lastTodo.order + 100;
    } else {
        const destPrevTodo = todos[orderData[destinationIndex - 1]];
        const destPrevTodoOrder = destPrevTodo.order;
        const destTodo = todos[orderData[destinationIndex]];
        const destTodoOrder = destTodo.order;

        if (Math.abs(destPrevTodoOrder - destTodoOrder) !== 1)
            return Math.floor((destTodoOrder + destPrevTodoOrder) / 2);
        else return null;
    }
};
