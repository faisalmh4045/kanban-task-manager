import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import {
    AuthWrapper,
    PageLink,
    FormHeading,
    ResetPasswordForm,
} from "../components";
import { toast } from "sonner";

const ResetPassword = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const params = new URLSearchParams(loc.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    const handleResetPassword = async (data) => {
        try {
            await authService.resetPassword({
                ...data,
                userId,
                secret,
            });
            toast.success("Password reset successfully.", {
                position: "top-center",
                duration: 7000,
                description: "You can now log in with your new password.",
            });
            navigate("/login");
        } catch (err) {
            if (err?.type === "password_recently_used") {
                toast.error("Password recently used!", {
                    position: "top-center",
                    duration: 6000,
                    description:
                        "Please choose a different password and try again.",
                });
            } else {
                toast.error("Failed to reset password.", {
                    position: "top-center",
                    duration: 6000,
                    description: "Please check the link or try again later.",
                });
            }
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
                title="Set new password"
                subtitle="Pick a unique password that you haven't used before"
            />

            <ResetPasswordForm resetPassword={handleResetPassword} />
        </AuthWrapper>
    );
};

export default ResetPassword;
