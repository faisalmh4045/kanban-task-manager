import { Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Col } from "react-bootstrap";

const Board = ({ orderArrays, todoMap, handleDeleteTodo }) => {
    return (
        <div className="d-flex justify-content-between">
            {Object.keys(orderArrays).map((column) => (
                <Droppable key={column} droppableId={column}>
                    {(provided) => (
                        <Col
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="bg-secondary-subtle"
                        >
                            <span>
                                {column.charAt(0).toUpperCase() +
                                    column.slice(1)}
                            </span>
                            <span> {orderArrays[column].length}</span>
                            <Column
                                taskIds={orderArrays[column]}
                                todoMap={todoMap}
                                handleDeleteTodo={handleDeleteTodo}
                            />
                            {provided.placeholder}
                        </Col>
                    )}
                </Droppable>
            ))}
        </div>
    );
};

export default Board;
