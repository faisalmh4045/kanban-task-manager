const AuthWrapper = ({ children }) => {
    return (
        <div className="auth-wrapper d-flex flex-column justify-content-center align-items-center p-2">
            <div className="d-flex align-items-center bg-white py-5 px-3 p-md-5 rounded-4 border">
                <div className="d-none d-lg-block">
                    <img src="/auth-image.png" className="img-fluid" alt="" />
                </div>
                <div className="px-4 px-lg-5">{children}</div>
            </div>
        </div>
    );
};

export default AuthWrapper;
