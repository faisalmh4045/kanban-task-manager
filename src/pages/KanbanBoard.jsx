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

const KanbanBoard = () => {
    const { todos, orderArrays } = useSelector((state) => state.todoList);
    const { userId } = useSelector((state) => state.auth.userSession);
    const dispatch = useDispatch();

    const fetchOrderAdjustedData = async () => {
        try {
            const todos = await appwriteServerFunctions.getOrderedTodos(userId);
            dispatch(setTodos(todos));
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

        const sourceColumn = orderArrays[source.droppableId];
        const destColumn = orderArrays[destination.droppableId];
        const sourceArr = [...sourceColumn];
        const destinationArr = [...destColumn];
        const [movedTaskId] = sourceArr.splice(source.index, 1);

        let newOrder;

        if (source.droppableId === destination.droppableId) {
            newOrder = calculateNewOrder(todos, sourceArr, destination.index);

            if (newOrder) {
                await handleSameColumnDrag(
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
                await handleDifferentColumnDrag(
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

        if (!newOrder) {
            const dragInfo = { source, destination, draggableId };
            localStorage.setItem("pendingDragReq", JSON.stringify(dragInfo));
            fetchOrderAdjustedData();
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
