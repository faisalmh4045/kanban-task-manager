import { Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import ColumnHeader from "./ColumnHeader";
import { Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleTaskCardAction } from "../../helpers/handleTaskCardAction";

const Board = ({ orderArrays, todoMap }) => {
    const dispatch = useDispatch();

    const handleTaskAction = (evt) => {
        handleTaskCardAction(evt, todoMap, dispatch, orderArrays);
    };

    return (
        <Container fluid onClick={handleTaskAction}>
            <div className="d-flex g-5 overflow-auto">
                {Object.keys(orderArrays).map((column) => (
                    <Droppable key={column} droppableId={column}>
                        {(provided) => (
                            <Col
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="kanban-column me-3 p-3 rounded"
                            >
                                <ColumnHeader
                                    columnTitle={column}
                                    taskCount={orderArrays[column].length}
                                />
                                <Column
                                    taskIds={orderArrays[column]}
                                    todoMap={todoMap}
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
