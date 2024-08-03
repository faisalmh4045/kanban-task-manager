import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "./index";
import { Form } from "react-bootstrap";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                        <h2>Create an account</h2>
                        <p className="text-body-secondary">
                            Let&apos;s keep your tasks organized
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit(createNewAccount)}>
                        {error?.type === "user_already_exists" && (
                            <p className="text-danger fw-bold">
                                Email is already taken!
                            </p>
                        )}
                        <Input
                            label="Name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.name}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) =>
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
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be 8+ characters",
                                },
                            })}
                        />
                        <div className="d-grid mt-4">
                            <SubmitButton variant="dark">Sign up</SubmitButton>
                        </div>
                    </Form>
                    <div className="mt-3 text-secondary">
                        <small>
                            <span>Already have an account? </span>
                            <Link
                                to="/login"
                                className="text-decoration-none fw-bold"
                            >
                                Login
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
