import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../redux/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "./index";
import { Form } from "react-bootstrap";
import { toast } from "sonner";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const login = async (data) => {
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
        <div className="auth-wrapper d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-wrap align-items-center bg-white py-5 px-3 p-md-5 rounded-4 border">
                <div className="d-none d-lg-block">
                    <img src="/auth-image.png" className="img-fluid" alt="" />
                </div>
                <div className="px-4 px-lg-5">
                    <p className="mb-4">
                        <Link
                            to="/"
                            className="text-decoration-none text-muted"
                        >
                            <small>{"< Back to homepage"}</small>
                        </Link>
                    </p>

                    <div className="mb-5">
                        <h2>Hi, Welcome back!</h2>
                        <p className="text-body-secondary">
                            Let&apos;s explore the app again with us
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit(login)}>
                        {error?.type === "user_invalid_credentials" && (
                            <p className="text-danger fw-bold">
                                Incorrect email or password!
                            </p>
                        )}
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password}
                            className="mb-2"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be 8+ characters",
                                },
                            })}
                        />
                        <p className="text-end user-select-none">
                            <small>Forgot password?</small>
                        </p>
                        <div className="d-grid">
                            <SubmitButton variant="dark" loading={isSubmitting}>
                                Login
                            </SubmitButton>
                        </div>
                    </Form>

                    <div className="mt-4 text-secondary">
                        <small>
                            <span>Don&apos;t have an account? </span>
                            <Link
                                to="/signup"
                                className="text-decoration-none fw-bold"
                            >
                                Sign up
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
