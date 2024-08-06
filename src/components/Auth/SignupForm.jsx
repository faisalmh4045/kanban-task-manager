import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input, SubmitButton } from "../../components";

const SignupForm = ({ signup }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Form className="mb-3" onSubmit={handleSubmit(signup)}>
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
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be 8+ characters",
                    },
                })}
            />
            <div className="d-grid mt-3">
                <SubmitButton variant="dark" loading={isSubmitting}>
                    Sign up
                </SubmitButton>
            </div>
        </Form>
    );
};

export default SignupForm;
