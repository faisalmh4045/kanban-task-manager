import { Button, Spinner } from "react-bootstrap";

const SubmitButton = ({
    loading,
    loadingMsg = "Submitting",
    children,
    ...props
}) => {
    return (
        <Button type="submit" disabled={loading} {...props}>
            {loading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />{" "}
                    {loadingMsg}...
                    <span className="visually-hidden">{loadingMsg}...</span>
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;
