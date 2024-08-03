import { Draggable } from "react-beautiful-dnd";
import { TaskCard } from "../index";
import { useSelector } from "react-redux";

const Column = ({ taskIds, todoMap, handleDeleteTodo }) => {
    const filter = useSelector((state) => state.filter.value);

    return taskIds.map((taskId, index) => {
        const task = todoMap[taskId];
        return (
            (filter === task.priority || filter === "All") && (
                <Draggable
                    key={task.$id}
                    draggableId={String(task.$id)}
                    index={index}
                >
                    {(provided) => (
                        <div
                            className="mb-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>
                                <TaskCard
                                    todo={task}
                                    handleDelete={handleDeleteTodo}
                                />
                            </div>
                        </div>
                    )}
                </Draggable>
            )
        );
    });
};

export default Column;
