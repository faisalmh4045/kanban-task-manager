import { Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Col, Container } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { openModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";

const Board = ({ orderArrays, todoMap, handleDeleteTodo }) => {
    const dispatch = useDispatch();

    return (
        <Container fluid>
            <div className="d-flex g-5 overflow-auto">
                {Object.keys(orderArrays).map((column) => (
                    <Droppable key={column} droppableId={column}>
                        {(provided) => (
                            <Col
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="kanban-column me-3 p-3 rounded"
                            >
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div>
                                        <span className="fs-5">
                                            {column.charAt(0).toUpperCase() +
                                                column.slice(1)}
                                        </span>
                                        <span className="ms-2 px-1 py-0 rounded-2 kanban-column-task-count">
                                            {orderArrays[column].length}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                openModal({
                                                    status:
                                                        column
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        column.slice(1),
                                                })
                                            )
                                        }
                                        className="btn"
                                    >
                                        <FiPlus size={20} />
                                    </button>
                                </div>
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
        </Container>
    );
};

export default Board;
