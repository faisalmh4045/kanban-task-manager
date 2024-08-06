import { Link } from "react-router-dom";

const PageLink = ({ to, linkText, message, className = "" }) => {
    return (
        <small>
            {message && <span className="text-secondary">{message}</span>}
            <Link 
                to={to} 
                className={`text-decoration-none ${className}`}
            >
                {linkText}
            </Link>
        </small>
    );
};

export default PageLink;
