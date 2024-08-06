import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import {
    AuthWrapper,
    PageLink,
    FormHeading,
    Input,
    SubmitButton,
} from "../components";
import { Form } from "react-bootstrap";
import { toast } from "sonner";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleSendLink = async (data) => {
        console.log(data);
        try {
            await authService.sendResetPasswordLink(data);

            toast("Check your email", {
                description: `We sent a password reset link to ${data.email}`,
                position: "top-center",
                duration: Infinity,
                action: {
                    label: "Got it",
                    onClick: () => toast.dismiss(),
                },
            });
        } catch (err) {
            const message = err?.type.replace(/_/g, " ");
            toast.error("Failed to send password reset link.", {
                position: "top-center",
                description: message,
            });
        }
    };

    return (
        <AuthWrapper>
            <PageLink
                to="/login"
                linkText="< Back to login"
                className="link-dark"
            />

            <FormHeading
                title="Forgot password?"
                subtitle={
                    <>
                        {`It happens. Don't worry,`}
                        <br />
                        {`we'll send you reset instructions.`}
                    </>
                }
            />

            <Form className="mb-3" onSubmit={handleSubmit(handleSendLink)}>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email}
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPattern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                    value
                                ) || "Please enter a valid email address",
                        },
                    })}
                />
                <div className="d-grid">
                    <SubmitButton variant="dark" loading={isSubmitting}>
                        Send link to email
                    </SubmitButton>
                </div>
            </Form>

            <PageLink
                to="/signup"
                linkText="Sign up"
                className="link-primary fw-bold"
                message="Don't have an account? "
            />
        </AuthWrapper>
    );
};

export default ForgotPassword;
