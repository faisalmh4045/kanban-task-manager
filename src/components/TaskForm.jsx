import { useEffect } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

const TaskForm = ({ onSubmit, todo }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (todo) {
            reset({
                title: todo.title || "",
                description: todo.description || "",
                status: todo.status || "",
                priority: todo.priority || "",
                date: todo.date ? new Date(todo.date) : "",
            });
        } else {
            reset({
                title: "",
                description: "",
                status: "",
                priority: "",
                date: null,
            });
        }
    }, [todo, reset]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel controlId="formTitle" label="Title" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="enter title of the task"
                    {...register("title", {
                        required: "title is required",
                    })}
                    isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
                controlId="formDescription"
                label="Description"
                className="mb-3"
            >
                <Form.Control
                    as="textarea"
                    placeholder="enter description of the task"
                    style={{ height: "20vh" }}
                    {...register("description", {
                        required: "description is required",
                    })}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                </Form.Control.Feedback>
            </FloatingLabel>

            <Row className="g-2">
                <Col md>
                    <Form.Group controlId="formDate">
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: "Date is required" }}
                            render={({ field }) => (
                                <Form.Control
                                    as={DatePicker}
                                    isClearable={1}
                                    placeholderText="dd/mm/yyyy"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    dateFormat="MMM dd, yyyy"
                                    className={`d-block ${
                                        errors.date ? "is-invalid" : ""
                                    }`}
                                />
                            )}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.date?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group controlId="formPriority">
                        <Form.Select
                            {...register("priority", {
                                required: "Priority is required",
                            })}
                            isInvalid={!!errors.priority}
                        >
                            <option value="">Select priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.priority?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group controlId="formStatus">
                        <Form.Select
                            {...register("status", {
                                required: "Status is required",
                            })}
                            isInvalid={!!errors.status}
                        >
                            <option value="">Select status</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Review">Need Review</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.status?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Button className="mt-3" variant="primary" type="submit">
                {todo ? "Update Task" : "Create Task"}
            </Button>
        </Form>
    );
};

export default TaskForm;
