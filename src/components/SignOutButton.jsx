import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../redux/authSlice";
import { deleteTodos } from "../redux/todoSlice";
import { SubmitButton } from "../components";
import { BiLogOutCircle } from "react-icons/bi";
import { toast } from "sonner";

const SignOutButton = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await authService.logout();
            dispatch(logout());
            dispatch(deleteTodos());
        } catch (err) {
            toast.error("Unable to sign out.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubmitButton
            className="d-flex align-items-center profile-action-btn"
            variant="secondary"
            size="sm"
            onClick={handleSignOut}
            loading={loading}
            loadingMsg="&nbsp;Signing out"
        >
            <BiLogOutCircle size={17} />
            <span className="ms-1">Sign Out</span>
        </SubmitButton>
    );
};

export default SignOutButton;
