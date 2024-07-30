import { Dropdown, SplitButton } from "react-bootstrap";
import { setFilter } from "../redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const FilterDropdown = () => {
    const filter = useSelector((state) => state.filter.value);
    const dispatch = useDispatch();

    const handleSelect = (eventKey) => {
        dispatch(setFilter(eventKey));
    };

    return (
        <SplitButton
            title={filter}
            variant="primary"
            id="split-button-dropdown"
            drop="down-centered"
            onSelect={handleSelect}
        >
            <Dropdown.Header>Filter By Priority</Dropdown.Header>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="High">High</Dropdown.Item>
            <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
            <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
        </SplitButton>
    );
};

export default FilterDropdown;
