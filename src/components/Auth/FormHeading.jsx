const FormHeading = ({ title, subtitle }) => {
    return (
        <div className="mt-4 mb-5">
            <h2>{title}</h2>
            <p className="text-body-secondary">{subtitle}</p>
        </div>
    );
};

export default FormHeading;
