import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import appwriteServerFunctions from "../../appwrite/serverFunctions";
import { logout } from "../../redux/authSlice";
import { deleteTodos } from "../../redux/todoSlice";
import { SubmitButton } from "../../components";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

const DeleteAccountButton = ({ userId, className = "" }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDeleteUser = async () => {
        const confirmation = window.prompt(
            "To delete your account, please type 'CONFIRM' below. This action cannot be undone."
        );

        if (confirmation !== "CONFIRM") {
            alert("Account deletion cancelled.");
            return;
        }

        setLoading(true);
        try {
            await authService.blockUser();
            dispatch(logout());
            dispatch(deleteTodos());
            toast.success("Account deleted successfully.", {
                position: "top-center",
            });
            await appwriteServerFunctions.deleteUser(userId);
        } catch (err) {
            toast.error("Failed to delete account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubmitButton
            className={`d-flex align-items-center ${className}`}
            variant="outline-danger"
            size="sm"
            onClick={handleDeleteUser}
            loading={loading}
            loadingMsg="&nbsp;Deleting account"
        >
            <AiOutlineDelete size={16} />
            <span className="ms-1">Delete account</span>
        </SubmitButton>
    );
};

export default DeleteAccountButton;
