const ORDER_OFFSET_VALUE = 100;

const orderValueAtStart = (todos, orderData) => {
    if (orderData.length === 0) return ORDER_OFFSET_VALUE;

    const destTaskId = orderData[0];
    const destTask = todos[destTaskId];
    if (destTask.order !== 1) {
        return Math.floor(destTask.order / 2);
    } else {
        return null;
    }
};

const orderValueAtEnd = (todos, orderData) => {
    const lastTodo = todos[orderData.at(-1)];
    return lastTodo.order + ORDER_OFFSET_VALUE;
};

const orderValueInMiddle = (todos, orderData, destIndex) => {
    const destPrevTodo = todos[orderData[destIndex - 1]];
    const destPrevTodoOrder = destPrevTodo.order;
    const destTodo = todos[orderData[destIndex]];
    const destTodoOrder = destTodo.order;

    const orderDiff = Math.abs(destPrevTodoOrder - destTodoOrder);

    if (orderDiff !== 1) {
        return Math.floor((destTodoOrder + destPrevTodoOrder) / 2);
    } else {
        return null;
    }
};

export const calculateNewOrder = (todos, orderData, destIndex) => {
    if (destIndex === 0) {
        return orderValueAtStart(todos, orderData);
    } else if (destIndex === orderData.length) {
        return orderValueAtEnd(todos, orderData);
    } else {
        return orderValueInMiddle(todos, orderData, destIndex);
    }
};
