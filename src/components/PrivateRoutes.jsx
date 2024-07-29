import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoutes = () => {
    const authStatus = useSelector((state) => state.auth.status);

    return authStatus ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
