import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Input, SubmitButton } from "../../components";

const ResetPasswordForm = ({ resetPassword }) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Form onSubmit={handleSubmit(resetPassword)}>
            <Input
                label="New password"
                type="password"
                placeholder="••••••••"
                className="mb-2"
                error={errors.newPassword}
                {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be 8+ characters",
                    },
                })}
            />
            <Input
                label="Repeat new password"
                type="password"
                placeholder="••••••••"
                className="mb-2"
                error={errors.confirmPassword}
                {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    minLength: {
                        value: 8,
                        message: "Password must be 8+ characters",
                    },
                    validate: (value) =>
                        value === getValues("newPassword") ||
                        "Passwords must match",
                })}
            />
            <div className="d-grid mt-3">
                <SubmitButton variant="dark" loading={isSubmitting}>
                    Reset password
                </SubmitButton>
            </div>
        </Form>
    );
};

export default ResetPasswordForm;
