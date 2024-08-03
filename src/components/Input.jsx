import { forwardRef, useId } from "react";
import { Form } from "react-bootstrap";

const Input = forwardRef(function Input(
    { label, type = "text", className = "mb-3", error, ...props },
    ref
) {
    const id = useId();
    return (
        <Form.Group className={className}>
            {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
            <Form.Control
                type={type}
                ref={ref}
                {...props}
                id={id}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
});

export default Input;
