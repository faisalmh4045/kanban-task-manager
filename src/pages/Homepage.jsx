import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <div>
            welcome to task manager app.
            {authStatus ? (
                <div>
                    Continue to <Link to="/all-tasks">dashboard</Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            )}
        </div>
    );
};

export default Homepage;
