import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "./index";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const createNewAccount = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login({ currentUser }));
                navigate("/all-tasks");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(createNewAccount)}>
                {error && <p>{error}</p>}
                <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
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
                <SubmitButton type="submit">Sign up</SubmitButton>
            </form>

            <Link to="/login">Login</Link>
        </div>
    );
};

export default Signup;
