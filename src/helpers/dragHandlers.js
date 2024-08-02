import appwriteDbService from "../appwrite/database";
import { updateTodo } from "../redux/todoSlice";

export const handleSameColumnDrag = async (
    sourceArr,
    destinationIndex,
    movedTaskId,
    todos,
    draggableId,
    newOrder,
    dispatch
) => {
    sourceArr.splice(destinationIndex, 0, movedTaskId);
    const todo = todos[draggableId];
    const updatedTodo = { ...todo, order: newOrder };

    dispatch(
        updateTodo({
            updatedTodo: updatedTodo,
            prevOrder: {
                prevStatus: updatedTodo.status,
                prevTaskOrder: sourceArr,
            },
            newOrder: null,
        })
    );

    const document = await appwriteDbService.updateTodo(todo.$id, updatedTodo);

    return document ? true : false;
};

export const handleDifferentColumnDrag = async (
    sourceArr,
    sourceDroppableId,
    destinationArr,
    destinationDroppableId,
    destinationIndex,
    movedTaskId,
    todos,
    draggableId,
    newOrder,
    dispatch
) => {
    destinationArr.splice(destinationIndex, 0, movedTaskId);
    const todo = todos[draggableId];
    const updatedTodo = {
        ...todo,
        order: newOrder,
        status:
            destinationDroppableId.charAt(0).toUpperCase() +
            destinationDroppableId.slice(1),
    };

    dispatch(
        updateTodo({
            updatedTodo: updatedTodo,
            prevOrder: {
                prevStatus: sourceDroppableId,
                prevTaskOrder: sourceArr,
            },
            newOrder: {
                newStatus: destinationDroppableId,
                newTaskOrder: destinationArr,
            },
        })
    );
    const document = await appwriteDbService.updateTodo(todo.$id, updatedTodo);

    return document ? true : false;
};
