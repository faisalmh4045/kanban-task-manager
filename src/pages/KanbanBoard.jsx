import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import appwriteServerFunctions from "../appwrite/serverFunctions";
import { Board } from "../components";
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import { handleDeleteTodo } from "../helpers/handleDeleteTodo";
import { calculateNewOrder } from "../helpers/calculateNewOrder";
import {
    handleDifferentColumnDrag,
    handleSameColumnDrag,
} from "../helpers/dragHandlers";
import { useEffect } from "react";
import { toast } from "sonner";

const KanbanBoard = () => {
    const { todos, orderArrays } = useSelector((state) => state.todoList);
    const { userId } = useSelector((state) => state.auth.userSession);
    const dispatch = useDispatch();

    const fetchOrderAdjustedData = async (toastId) => {
        try {
            const todos = await appwriteServerFunctions.getOrderedTodos(userId);
            dispatch(setTodos(todos));
            toast.dismiss(toastId);
        } catch (error) {
            console.error("KanbanBoard :: Error :", error);
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
        const sourceArr = [...sourceColumn];
        const destinationArr = [...destColumn];
        const [movedTaskId] = sourceArr.splice(source.index, 1);

        let newOrder, isUpdated;

        if (source.droppableId === destination.droppableId) {
            newOrder = calculateNewOrder(todos, sourceArr, destination.index);

            if (newOrder) {
                isUpdated = await handleSameColumnDrag(
                    sourceArr,
                    destination.index,
                    movedTaskId,
                    todos,
                    draggableId,
                    newOrder,
                    dispatch
                );
            }
        } else {
            newOrder = calculateNewOrder(
                todos,
                destinationArr,
                destination.index
            );

            if (newOrder) {
                isUpdated = await handleDifferentColumnDrag(
                    sourceArr,
                    source.droppableId,
                    destinationArr,
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
            const dragInfo = { source, destination, draggableId };
            localStorage.setItem("pendingDragReq", JSON.stringify(dragInfo));
            fetchOrderAdjustedData(toastId);
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Board
                orderArrays={orderArrays}
                todoMap={todos}
                handleDeleteTodo={({ id, status }) =>
                    handleDeleteTodo({ id, status, dispatch, orderArrays })
                }
            />
        </DragDropContext>
    );
};

export default KanbanBoard;
