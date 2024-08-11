import { Draggable } from "react-beautiful-dnd";
import { TaskCard } from "../index";
import { useSelector } from "react-redux";

const Column = ({ taskIds, todoMap }) => {
    const filter = useSelector((state) => state.filter.value);

    return (
        <>
            {taskIds.map((taskId, index) => {
                const task = todoMap[taskId];

                if (filter === "All" || filter === task.priority)
                    return (
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
                                    <TaskCard todo={task} />
                                </div>
                            )}
                        </Draggable>
                    );
            })}
        </>
    );
};

export default Column;
