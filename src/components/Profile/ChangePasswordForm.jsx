import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import { Input, SubmitButton } from "../../components";
import authService from "../../appwrite/auth";
import { toast } from "sonner";

const ChangePasswordForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const changePassword = async (data) => {
        try {
            await authService.changePassword(data);
            toast.success("Password changed successfully.");
        } catch (err) {
            const message = err?.type.replace(/_/g, " ");
            toast.error("Failed to change password.", {
                description: message,
            });
        } finally {
            reset();
        }
    };

    return (
        <Form onSubmit={handleSubmit(changePassword)}>
            <Input
                label="Current password"
                type="password"
                placeholder="••••••••"
                className="mb-2"
                error={errors.currentPassword}
                {...register("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be 8+ characters",
                    },
                })}
            />
            <Row xs={1} md={2}>
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
            </Row>

            <SubmitButton
                className="mt-2 profile-action-btn"
                variant="secondary"
                loading={isSubmitting}
                loadingMsg="updating"
            >
                <small>Change password</small>
            </SubmitButton>
        </Form>
    );
};

export default ChangePasswordForm;
