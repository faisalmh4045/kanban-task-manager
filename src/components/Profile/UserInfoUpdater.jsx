import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/authSlice";
import authService from "../../appwrite/auth";
import { Button, Form } from "react-bootstrap";
import { SubmitButton } from "../../components";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const UserInfoUpdater = ({ name, email }) => {
    const dispatch = useDispatch();
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleUpdateName = async () => {
        if (isUsernameEditable) {
            const updatedName = inputRef.current.value.trim();

            if (updatedName === name) {
                toast.info("No changes to the name.");
                setIsUsernameEditable(false);
                return;
            }

            setLoading(true);

            try {
                await authService.updateName(updatedName);
                dispatch(updateName({ updatedName }));
                toast.success("Name updated successfully.");
            } catch (err) {
                toast.error("Failed to update name. Please try again.");
            } finally {
                setIsUsernameEditable(false);
                setLoading(false);
            }
        } else {
            setIsUsernameEditable(true);
            inputRef.current.focus();
        }
    };

    const handleCancel = () => {
        inputRef.current.value = name;
        setIsUsernameEditable(false);
    };

    return (
        <>
            <div className="mb-4">
                <Form.Label>Full name</Form.Label>
                <div className="d-flex justify-content-between">
                    <Form.Control
                        className="me-2"
                        type="text"
                        ref={inputRef}
                        readOnly={!isUsernameEditable}
                        defaultValue={name}
                    />
                    <SubmitButton
                        className="d-flex align-items-center profile-action-btn"
                        variant="secondary"
                        onClick={handleUpdateName}
                        loading={loading}
                        loadingMsg="&nbsp;updating"
                    >
                        {isUsernameEditable ? <MdDone /> : <FiEdit3 />}
                    </SubmitButton>
                    {isUsernameEditable && (
                        <Button
                            className="ms-2 profile-action-btn"
                            variant="secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            <RxCross2 />
                        </Button>
                    )}
                </div>
            </div>
            <Form.Group className="mb-0" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    className="bg-light"
                    type="email"
                    defaultValue={email}
                    disabled
                />
                <Form.Text>Your email address cannot be changed.</Form.Text>
            </Form.Group>
        </>
    );
};

export default UserInfoUpdater;
