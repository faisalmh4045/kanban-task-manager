import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <Container className="pt-5">
            <div className="d-flex flex-column justify-content-center text-center p-2 m-md-2 m-lg-5 p-lg-5">
                <div>
                    <h2 className="fw-bold">
                        {authStatus
                            ? "Great to Have You Back!"
                            : "Manage Tasks Seamlessly"}
                    </h2>
                    <p className="col col-md-6 mx-auto my-4">
                        Effortlessly track progress, prioritize tasks, and
                        organize them in a board view. Stay productive while
                        planning your day, managing projects, or tracking
                        deadlines.
                    </p>
                </div>
                <div className="mb-5 mt-3">
                    {authStatus ? (
                        <Link to="/all-tasks" className="btn btn-dark">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">
                                Sign In
                            </Link>
                            <span> </span>
                            <Link to="/signup" className="btn btn-dark">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
                <picture>
                    <source
                        srcSet="https://res.cloudinary.com/dwked6q0h/image/upload/v1721226092/kanban-app/app-preview-lg_tj188v.png"
                        media="(min-width: 992px)"
                    />
                    <source
                        srcSet="https://res.cloudinary.com/dwked6q0h/image/upload/v1721226092/kanban-app/app-preview-md_jgd8zl.png"
                        media="(min-width: 768px)"
                    />
                    <img
                        src="https://res.cloudinary.com/dwked6q0h/image/upload/v1721226092/kanban-app/app-preview-sm_uhqenq.png"
                        alt="App preview"
                        className="img-fluid shadow rounded border"
                    />
                </picture>
            </div>
        </Container>
    );
};

export default Homepage;
