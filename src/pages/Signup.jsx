import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../redux/authSlice";
import { AuthWrapper, FormHeading, SignupForm, PageLink } from "../components";
import { toast } from "sonner";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState({});

    const createNewAccount = async (data) => {
        setError({});
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login({ currentUser }));
                navigate("/all-tasks");
            }
        } catch (error) {
            setError(error);

            if (error?.type !== "user_already_exists") {
                const message = error?.type.replace(/_/g, " ");
                toast.warning(message, {
                    position: "top-center",
                    duration: 5000,
                });
            }
        }
    };

    return (
        <AuthWrapper>
            <PageLink
                to="/"
                linkText="< Back to homepage"
                className="link-dark"
            />

            <FormHeading
                title="Create an account"
                subtitle="Let's keep your tasks organized"
            />

            {error?.type === "user_already_exists" && (
                <p className="text-danger fw-bold">Email is already taken!</p>
            )}

            <SignupForm signup={createNewAccount} />

            <PageLink
                to="/login"
                linkText="Login"
                className="link-primary fw-bold"
                message="Already have an account? "
            />
        </AuthWrapper>
    );
};

export default Signup;
