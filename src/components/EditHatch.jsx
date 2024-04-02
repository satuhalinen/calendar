import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

function EditHatch({ number }) {
  return (
    <div
      style={{
        border: "1px solid black",

        width: "80%",
        height: "80%",
      }}
    >
      <div className="hatch">{number}</div>
      <DropdownButton id="dropdown-item-button" title="Choose a topic">
        <Dropdown.Item as="button">Adults</Dropdown.Item>
        <Dropdown.Item as="button">Animals</Dropdown.Item>
        <Dropdown.Item as="button">Children and teenagers</Dropdown.Item>
        <Dropdown.Item as="button">Elderly</Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-item-button" title="Choose an alternative">
        <Dropdown.Item as="button">Alternative 1</Dropdown.Item>
        <Dropdown.Item as="button">Alternative 2</Dropdown.Item>
        <Dropdown.Item as="button">Alternative 3</Dropdown.Item>
        <Dropdown.Item as="button">Alternative 4</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
export default EditHatch;
