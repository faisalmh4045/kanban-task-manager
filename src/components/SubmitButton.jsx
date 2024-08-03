import { Button } from "react-bootstrap";

const SubmitButton = ({ children, ...props }) => {
    return (
        <Button type="submit" {...props}>
            {children}
        </Button>
    );
};

export default SubmitButton;
