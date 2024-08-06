import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../redux/authSlice";
import { AuthWrapper, FormHeading, LoginForm, PageLink } from "../components";
import { toast } from "sonner";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const handleLogin = async (data) => {
        setError({});
        try {
            const isLoggedIn = await authService.login(data);
            if (isLoggedIn) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(authLogin({ currentUser }));
                navigate("/all-tasks");
            }
        } catch (err) {
            setError(err);

            if (err?.type !== "user_invalid_credentials") {
                const message = err?.type.replace(/_/g, " ");
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
                title="Hi, Welcome back!"
                subtitle="Let's explore the app again with us"
            />

            {error?.type === "user_invalid_credentials" && (
                <p className="text-danger fw-bold">
                    Incorrect email or password!
                </p>
            )}

            <LoginForm login={handleLogin} />

            <PageLink
                to="/signup"
                linkText="Sign up"
                className="link-primary fw-bold"
                message="Don't have an account? "
            />
        </AuthWrapper>
    );
};

export default Login;
