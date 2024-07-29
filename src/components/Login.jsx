import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../redux/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "./index";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        try {
            const isLoggedIn = await authService.login(data);
            if (isLoggedIn) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(authLogin({ currentUser }));
                navigate("/all-tasks");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(login)}>
                {error && <p>{error}</p>}
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                    value
                                ) || "Email address must be a valid address",
                        },
                    })}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                />
                <SubmitButton type="submit">Login</SubmitButton>
            </form>

            <Link to="/signup">Sign Up</Link>
        </div>
    );
};

export default Login;
