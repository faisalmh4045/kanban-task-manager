import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "../../components";
import { Link } from "react-router-dom";

const LoginForm = ({ login }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Form className="mb-3" onSubmit={handleSubmit(login)}>
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
                            ) || "Email address must be a valid address",
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
            <p className="text-end">
                <Link
                    to="/forgot-password"
                    className="text-decoration-none text-dark"
                >
                    <small>Forgot password?</small>
                </Link>
            </p>
            <div className="d-grid">
                <SubmitButton variant="dark" loading={isSubmitting}>
                    Login
                </SubmitButton>
            </div>
        </Form>
    );
};

export default LoginForm;
