import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import appwriteServerFunctions from "../appwrite/serverFunctions";
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import { Board } from "../components";
import {
    calculateNewOrder,
    handleSameColumnDrag,
    handleDifferentColumnDrag,
} from "../helpers";
import { toast } from "sonner";

const KanbanBoard = () => {
    const { todos, orderArrays } = useSelector((state) => state.todoList);
    const { userId } = useSelector((state) => state.auth.userSession);
    const dispatch = useDispatch();

    const handleDragConflict = async (
        source,
        destination,
        draggableId,
        toastId
    ) => {
        const dragInfo = { source, destination, draggableId };
        localStorage.setItem("pendingDragReq", JSON.stringify(dragInfo));

        try {
            const todos = await appwriteServerFunctions.getOrderedTodos(userId);
            dispatch(setTodos(todos));
            toast.dismiss(toastId);
        } catch (error) {
            console.error("KanbanBoard :: Error :", error);
        }
    };

    const handleOnDragEnd = async ({ source, destination, draggableId }) => {
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const toastId = toast.loading("Updating...");

        const sourceColumn = orderArrays[source.droppableId];
        const destColumn = orderArrays[destination.droppableId];
        const srcArr = [...sourceColumn];
        const destArr = [...destColumn];
        const [movedTaskId] = srcArr.splice(source.index, 1);

        let newOrder, isUpdated;

        if (source.droppableId === destination.droppableId) {
            newOrder = calculateNewOrder(todos, srcArr, destination.index);

            if (newOrder) {
                isUpdated = await handleSameColumnDrag(
                    srcArr,
                    destination.index,
                    movedTaskId,
                    todos,
                    draggableId,
                    newOrder,
                    dispatch
                );
            }
        } else {
            newOrder = calculateNewOrder(todos, destArr, destination.index);

            if (newOrder) {
                isUpdated = await handleDifferentColumnDrag(
                    srcArr,
                    source.droppableId,
                    destArr,
                    destination.droppableId,
                    destination.index,
                    movedTaskId,
                    todos,
                    draggableId,
                    newOrder,
                    dispatch
                );
            }
        }

        if (newOrder) {
            if (isUpdated) {
                toast.success("Board updated", {
                    id: toastId,
                });
            } else {
                toast.error("Something went wrong", {
                    id: toastId,
                });
            }
        } else {
            handleDragConflict(source, destination, draggableId, toastId);
        }
    };

    useEffect(() => {
        const pendingDragReq = JSON.parse(
            localStorage.getItem("pendingDragReq")
        );
        if (pendingDragReq) {
            handleOnDragEnd(pendingDragReq);
            localStorage.removeItem("pendingDragReq");
        }
    });

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Board orderArrays={orderArrays} todoMap={todos} />
        </DragDropContext>
    );
};

export default KanbanBoard;
