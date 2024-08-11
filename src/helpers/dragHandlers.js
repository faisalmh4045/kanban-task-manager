import appwriteDbService from "../appwrite/database";
import { updateTodo } from "../redux/todoSlice";

export const handleSameColumnDrag = async (
    srcArr,
    destIndex,
    movedTaskId,
    todos,
    draggableId,
    newOrder,
    dispatch
) => {
    srcArr.splice(destIndex, 0, movedTaskId);
    const todo = todos[draggableId];
    const updatedTodo = { ...todo, order: newOrder };

    dispatch(
        updateTodo({
            updatedTodo: updatedTodo,
            prevOrder: {
                prevStatus: updatedTodo.status,
                prevTaskOrder: srcArr,
            },
            newOrder: null,
        })
    );

    const document = await appwriteDbService.updateTodo(todo.$id, updatedTodo);

    return document ? true : false;
};

export const handleDifferentColumnDrag = async (
    srcArr,
    srcDroppableId,
    destArr,
    destDroppableId,
    destIndex,
    movedTaskId,
    todos,
    draggableId,
    newOrder,
    dispatch
) => {
    destArr.splice(destIndex, 0, movedTaskId);
    const todo = todos[draggableId];
    const updatedTodo = {
        ...todo,
        order: newOrder,
        status: destDroppableId,
    };

    dispatch(
        updateTodo({
            updatedTodo: updatedTodo,
            prevOrder: {
                prevStatus: srcDroppableId,
                prevTaskOrder: srcArr,
            },
            newOrder: {
                newStatus: destDroppableId,
                newTaskOrder: destArr,
            },
        })
    );
    const document = await appwriteDbService.updateTodo(todo.$id, updatedTodo);

    return document ? true : false;
};
