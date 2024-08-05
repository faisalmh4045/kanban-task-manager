import { useSelector } from "react-redux";
import { Container, Col } from "react-bootstrap";
import {
    AvatarUploader,
    UserInfoUpdater,
    ChangePasswordForm,
    SignOutButton,
    DeleteAccountButton,
} from "../components";

const Profile = () => {
    const { userId, name, email, prefs } = useSelector(
        (state) => state.auth.userSession
    );

    return (
        <Container className="d-flex flex-column align-items-center">
            <Col md={10} lg={8} xl={7}>
                <div className="bg-white border mb-3 p-3 rounded shadow-sm">
                    <AvatarUploader prefs={prefs} />
                </div>

                <div className="bg-white border mb-3 p-3 rounded shadow-sm">
                    <h5 className="mb-3">Personal Information</h5>
                    <Col md={9}>
                        <UserInfoUpdater name={name} email={email} />
                    </Col>
                </div>

                <div className="bg-white border mb-3 p-3 rounded shadow-sm">
                    <h5 className="mb-1">Change password</h5>
                    <p className="text-body-secondary">
                        Pick a unique password that you haven&apos;t used before
                    </p>
                    <ChangePasswordForm />
                </div>

                <div className="bg-white border mb-3 p-3 rounded shadow-sm">
                    <h5 className="mb-1">Account security</h5>
                    <p className="text-body-secondary">
                        manage your account security.
                    </p>
                    <div className="d-flex">
                        <SignOutButton />
                        <DeleteAccountButton userId={userId} className="ms-2" />
                    </div>
                </div>
            </Col>
        </Container>
    );
};

export default Profile;
