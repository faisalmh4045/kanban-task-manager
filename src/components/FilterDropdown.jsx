import { Dropdown } from "react-bootstrap";
import { setFilter } from "../redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { LuFilterX } from "react-icons/lu";

const FilterDropdown = () => {
    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    const handleSelect = (eventKey) => {
        dispatch(setFilter(eventKey));
    };

    return (
        <Dropdown drop="down-centered" onSelect={handleSelect}>
            <Dropdown.Toggle
                className={`btn bg-white text-dark border-secondary`}
                id="dropdown-basic"
            >
                {filter !== "All" ? (
                    <span>{`#${filter}`}</span>
                ) : (
                    <>
                        <span className="d-sm-none">
                            <LuFilterX color="black" />
                        </span>
                        <span className="d-none d-sm-inline">Priority</span>
                    </>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Filter By Priority</Dropdown.Header>
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                <Dropdown.Item eventKey="High">High</Dropdown.Item>
                <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropdown;
